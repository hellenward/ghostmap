import React from 'react';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
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

jest.mock('@react-google-maps/api', () => ({
  ...jest.requireActual('@react-google-maps/api'),
  useJsApiLoader: () => ({
    isLoaded: true,
  }),
  GoogleMap: ({ children }) => <div data-testid="ghost-map">{children}</div>,
  MarkerF: (props) => <div data-testid="mock-marker" {...props} />,
}));

describe('App', () => {
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

  test('renders learn react link', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('app')).toBeInTheDocument();
    })

  });

  test('renders header', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Brighton Ghost Map/i)).toBeInTheDocument();
    })
  });
  test('renders GhostMap component', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('ghost-map')).toBeInTheDocument();
    })
  });
  test('should render GhostModal when ghost is selected', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('ghost-map')).toBeInTheDocument();
    })
    const ghostMap = screen.getByTestId('ghost-map');
    const marker = screen.getAllByTestId('mock-marker')[0];
    fireEvent.click(marker);
    await waitFor(() => {
      expect(screen.getByTestId('ghost-modal')).toBeInTheDocument();
    })
  })
})
