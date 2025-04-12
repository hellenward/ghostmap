import { GhostModal } from './';
import { render, screen } from '@testing-library/react';

describe('GhostModal', () => {
    const onClose = jest.fn();
    const ghost = {
        name: 'Ghost Name',
        subtitle: 'Ghost Subtitle',
        story: 'Ghost Story'
    };
    test('should render GhostModal', () => {
        render(<GhostModal onClose={onClose} ghost={ghost} />)
        expect(screen.getByTestId('ghost-modal')).toBeInTheDocument();
    })
    test('should render ghost name', () => {
        render(<GhostModal onClose={onClose} ghost={ghost} />)
        expect(screen.getByText(ghost.name)).toBeInTheDocument();
    })
    test('should render ghost subtitle', () => {
        render(<GhostModal onClose={onClose} ghost={ghost} />)
        expect(screen.getByText(ghost.subtitle)).toBeInTheDocument();
    })
    test('should render ghost story', () => {
        render(<GhostModal onClose={onClose} ghost={ghost} />)
        expect(screen.getByText(ghost.story)).toBeInTheDocument();
    })
    test('should call onClose when close button is clicked', () => {
        render(<GhostModal onClose={onClose} ghost={ghost} />)
        const button = screen.getByText('Close');
        button.click();
        expect(onClose).toHaveBeenCalledTimes(1);
    })
})