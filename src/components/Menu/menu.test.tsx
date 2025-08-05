import React from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: "test",
}
const testVerticalProps: MenuProps = {
    defaultIndex: '0',
    mode: "vertical",
}
const generateMenu = (props) => {
    return (
        <Menu {...props}>
            <MenuItem>Active</MenuItem>
            <MenuItem disabled>Disabled</MenuItem>
            <MenuItem>Nice</MenuItem>

        </Menu>
    )
}
describe("menu test suit", () => {
    let wrapper: RenderResult, menuElement, activeElement, disabledElement;
    beforeEach(() => {
        wrapper = render(generateMenu(testProps));
        menuElement = wrapper.getByTestId("test-menu");
        activeElement = wrapper.getByText("Active");
        disabledElement = wrapper.getByText("Disabled");
    });
    it("should render a  menu", () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass("cyy-menu");
        expect(menuElement.getElementsByTagName("li").length).toEqual(3);
        expect(activeElement).toHaveClass("is-active");
        expect(disabledElement).toHaveClass("is-disabled");
    });
    it("click event", () => {
        const thirdItem = wrapper.getByText("Nice");
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass("is-active");
        expect(activeElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
    })

    it("should render a vertical menu", () => {
        cleanup();
        const wrapper = render(generateMenu(testVerticalProps));
        const menuElement = wrapper.getByTestId("test-menu");
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass("cyy-menu");
        expect(menuElement).toHaveClass("menu-vertical");
    });

    it("should test submenu", () => {

    });
});
export {};