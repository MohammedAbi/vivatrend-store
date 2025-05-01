import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    interface Assertion<T = any> extends jest.Matchers<void, T> {}
    interface Expect extends jest.Expect {}
  }
}
