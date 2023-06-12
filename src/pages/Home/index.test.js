import {
  within,
  waitFor,
  fireEvent,
  render,
  screen,
  getByText,
} from "@testing-library/react";
import Home from "./index";
import { act } from "react-dom/test-utils";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});
jest.mock("../../contexts/DataContext/index", () => ({
  useData: () => ({
    data: {
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "User&product MixUsers",
      cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      description: "Présentation des nouveaux usages UX.",
      nb_guesses: 900,
      periode: "14-15-16 Avril",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 espace de restaurations",
      ],
    },
    error: null,
  }),
}));

jest.mock("../../contexts/DataContext/index", () => ({
  useData: () => ({
    last: {
      cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
      title: "Conférence #productCON",
      date: new Date("2022-08-29T20:28:45.744Z"),
    },
    error: null,
  }),
}));

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    const { container } = render(<Home />);
    const nosReal = await container.querySelector("#realisationTitle");
    expect(nosReal.innerHTML).toEqual("Nos réalisations");
    const events = await container.querySelector("#events");
    expect(events).toBeInTheDocument();
  });

  it("a list of people is displayed", async () => {
    render(<Home />);
    await screen.findByText("CEO");
    await screen.findByText("Alice");
    await screen.findByText("Isabelle");
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    const eventCardElement = screen.getByTestId("event-card");
    expect(eventCardElement).toBeInTheDocument();

    const eventTitle = screen.getByText("Conférence #productCON");
    expect(eventTitle).toBeInTheDocument();
  });
});
