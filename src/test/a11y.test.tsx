// 설치 필요
// npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom jest-axe babel-jest @babel/preset-env @babel/preset-react @babel/preset-typescript

import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Header from "@/app/components/header";
import { Input } from "@/app/components/input";
import Footer from "@/app/components/footer";
import SearchModal from "@/app/components/searchModal";
import { Button } from "@/app/components/button";
import Page from "@/app/(admin)/posts/page";

expect.extend(toHaveNoViolations);

describe("접근성 기본 테스트", () => {
  test("Header 컴포넌트가 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("Input 컴포넌트가 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<Input />);
    const results = await axe(container);
    // 심각한 위반이 있는지 체크
    expect(results).toHaveNoViolations();
  });
  test("Footer 컴포넌트가 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("SearchModal 컴포넌트가 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<SearchModal />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  test("Button 컴포넌트가 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  // 페이지

  test("페이지가 심각한 접근성 위반이 없어야 한다", async () => {
    const { container } = render(<Page />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
