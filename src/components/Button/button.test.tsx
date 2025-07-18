import Button from "./button";
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

test("", () =>{
    const wrapper = render(<Button>Nice</Button>)
    let element = wrapper.getByText("Nice");
    expect(element).toBeTruthy();
    expect(element).toBeInTheDocument();
});