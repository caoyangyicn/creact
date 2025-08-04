import Button, {ButtonType} from "./button";
import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'

const defaultProps = {
    onClick: jest.fn()
}

describe('test Button component', () => {
    it("has the button", () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        let element = wrapper.getByText("Nice");
        expect(element).toBeTruthy();
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual("BUTTON");
        expect(element).toHaveClass('cyy-btn');
    });
    it("click event", () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        let element = wrapper.getByText("Nice");
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it("click event", () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        let element = wrapper.getByText("Nice");
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it("a href", () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="www.baidu.com">Nice</Button>)
        let element = wrapper.getByText("Nice");
        expect(element.tagName).toEqual("A")
        // @ts-ignore
        expect(element.href).toEqual("http://localhost/www.baidu.com");
    });

    it("disabled click event", () => {
        const wrapper = render(<Button {...defaultProps} disabled>Nice</Button>)
        let element = wrapper.getByText("Nice");
        fireEvent.click(element);
        // @ts-ignore
        expect(defaultProps.onClick).not.toHaveBeenCalled();
    });
});

