import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    // Directly extend from jest.Matchers and jest.Expect
    type Assertion<T = unknown> = jest.Matchers<void, T>;
    type Expect = jest.Expect;
  }
}
