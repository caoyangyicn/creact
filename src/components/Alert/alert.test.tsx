import Alert  from "./alert";
import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from "../Button/button";

const defaultProps = {
    onClose: jest.fn(),
    hasClose: true
}

describe('test Alert component', () => {
    let element: HTMLElement | null;
    beforeEach(() => {
        const wrapper = render(<Alert {...defaultProps}>Nice</Alert>)
        element = wrapper.getByText("Nice").parentElement;
    });

    it("has the alert", () => {
        expect(element).toBeTruthy();
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual("DIV");
        expect(element).toHaveClass('alert');
    });

    it("has the alert", () => {
        expect(element).toBeTruthy();
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual("DIV");
        expect(element).toHaveClass('alert');
    });

    it("has close", () => {
        let icon = element?.querySelector('.close-icon');
        expect(icon).toBeTruthy();
    });

    it("has close", () => {
        fireEvent.click(element?.querySelector('.close-icon') as HTMLElement);
        expect(defaultProps.onClose).toHaveBeenCalled();
        expect(element).not.toBeInTheDocument();
    });
});

