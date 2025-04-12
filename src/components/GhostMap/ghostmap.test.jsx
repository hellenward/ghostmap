import { GhostMap } from './index.jsx';

import { render, screen } from '@testing-library/react';
import { getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
    const originalModule = jest.requireActual('firebase/firestore');

    return {
        ...originalModule,
        getDocs: jest.fn(),
        collection: jest.fn(),
        getFirestore: jest.fn(),
    };
});

const mockUseJsApiLoader = jest.fn();

jest.mock('@react-google-maps/api', () => ({
    ...jest.requireActual('@react-google-maps/api'),
    useJsApiLoader: () => mockUseJsApiLoader(),
    GoogleMap: ({ children }) => <div data-testid="ghost-map">{children}</div>,
    MarkerF: (props) => <div data-testid="mock-marker" {...props} />,
}));


describe('GhostMap', () => {
    beforeEach(() => {
        getDocs.mockResolvedValue({
            docs: [
                { data: () => ({ name: 'Ghost 1', subtitle: 'Subtitle 1', story: 'Story 1', latitude: 50.8217957, longitude: -0.1452242 }) },
                { data: () => ({ name: 'Ghost 2', subtitle: 'Subtitle 2', story: 'Story 2', latitude: 51.8217957, longitude: -0.1352242 }) },
            ],
        });

        global.google = {
            maps: {
                Size: class {
                    constructor(width, height) {
                        this.width = width;
                        this.height = height;
                    }
                }
            }
        };
    })

    test('should render GhostMap component', () => {
        mockUseJsApiLoader.mockReturnValue({ isLoaded: true });
        render(<GhostMap ghosts={[]} onGhostSelect={() => { }} />);
        expect(screen.getByTestId('ghost-map')).toBeInTheDocument();
    })

    test('should not render if ghosts are not loaded', () => {
        mockUseJsApiLoader.mockReturnValue({ isLoaded: false });
        render(<GhostMap ghosts={[]} onGhostSelect={() => { }} />);
        expect(screen.queryByTestId('ghost-map')).not.toBeInTheDocument();
    })

    test('should render markers corresponding to ghosts', () => {
        mockUseJsApiLoader.mockReturnValue({ isLoaded: true });
        const ghosts = [
            { name: 'Ghost 1', latitude: 50.8217957, longitude: -0.1452242 },
            { name: 'Ghost 2', latitude: 51.8217957, longitude: -0.1352242 },
        ];

        render(<GhostMap ghosts={ghosts} onGhostSelect={() => { }} />);

        const markers = screen.getAllByTestId('mock-marker');
        expect(markers.length).toBe(2);
    })
    test('should not render a marker if latitude or longitude is missing', () => {
        mockUseJsApiLoader.mockReturnValue({ isLoaded: true });
        const ghosts = [
            { name: 'Ghost 1', latitude: 50.8217957, longitude: -0.1452242 },
            { name: 'Ghost 2', latitude: null, longitude: -0.1352242 },
        ];

        render(<GhostMap ghosts={ghosts} onGhostSelect={() => { }} />);

        const markers = screen.queryAllByTestId('mock-marker');
        expect(markers.length).toBe(1);
    })
})