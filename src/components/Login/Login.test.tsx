import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import api from "../../services/interceptorExample";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../services/interceptorExample");
const mockedApi = api as jest.Mocked<typeof api>;

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders username, password fields and login button", () => {
    render(<Login />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  test("submits form and navigates on successful login", async () => {
    mockedApi.post.mockResolvedValue({
      data: { accessToken: "abc123", refreshToken: "def456" },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "emilys" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "emilyspass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/settings");
      expect(localStorage.getItem("at")).toBe("abc123");
      expect(localStorage.getItem("rt")).toBe("def456");
    });
  });

  test("logs error when API call fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.post.mockRejectedValue(new Error("Network error"));

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching user:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
