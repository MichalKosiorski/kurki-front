import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, test, expect, vi } from 'vitest';
import { SimpleInput } from '../scaffolding/simple-form-elements';

describe('SimpleInput', () => {
    test('render input works', () => {
        render(<SimpleInput placeholder="Wpisz coś" />);

        expect(
            screen.getByPlaceholderText('Wpisz coś')
        ).toBeInTheDocument();
    });

    test('wywołuje onChange', () => {
        const onChange = vi.fn();

        render(
            <SimpleInput
                value=""
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'test' }
        });

        expect(onChange).toHaveBeenCalledWith('test');
    });

    test('onEnter works', () => {
        const onEnter = vi.fn();

        render(
            <SimpleInput
                value="abc"
                onEnter={onEnter}
            />
        );

        fireEvent.keyDown(screen.getByRole('textbox'), {
            key: 'Enter'
        });

        expect(onEnter).toHaveBeenCalledWith('abc');
    });

    test('onUp works', () => {
        const onUp = vi.fn();

        render(
            <SimpleInput
                value="abc"
                onUp={onUp}
            />
        );

        fireEvent.keyDown(screen.getByRole('textbox'), {
            key: 'ArrowUp'
        });

        expect(onUp).toHaveBeenCalledWith('abc');
    });

    test('onDown works', () => {
        const onDown = vi.fn();

        render(
            <SimpleInput
                value="abc"
                onDown={onDown}
            />
        );

        fireEvent.keyDown(screen.getByRole('textbox'), {
            key: 'ArrowDown'
        });

        expect(onDown).toHaveBeenCalledWith('abc');
    });

    test('forwordRef works', () => {
        const ref = createRef();

        render(<SimpleInput ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    test('changing passowrd visibiliti works', () => {
        render(
            <SimpleInput
                type="password"
                value=""
            />
        );

        const input = screen.getByPlaceholderText('');

        expect(input).toHaveAttribute('type', 'password');

        const toggle = screen
            .getByAltText('pokaż hasło')
            .parentElement;

        fireEvent.click(toggle);

        expect(input).toHaveAttribute('type', 'text');

        fireEvent.click(toggle);

        expect(input).toHaveAttribute('type', 'password');
    });
});