import { describe, it } from "node:test";
import assert from "node:assert";
import { addRouteHandler, subtractRouteHandler } from "./lib.js";
import sinon from "sinon";
import request from "supertest";

import type { Request, Response } from "express";

type StubResponse = {
  status: sinon.SinonStub;
  send: sinon.SinonStub;
};

const createMockResponse = () => {
  const res: Partial<StubResponse> = {};
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res as StubResponse & Partial<Response>;
};

describe("add", () => {
  it("simple", () => {
    const mockResponse = createMockResponse();

    addRouteHandler({ body: { number1: "4", number2: "1" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(200) || mockResponse.status.notCalled, "Status should be 200");
    assert.ok(mockResponse.send.calledWith({ result: 5 }), "Result should be 5");
  });

  it("invalid input", () => {
    const mockResponse = createMockResponse();

    addRouteHandler({ body: { number1: "4", number2: "any" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(400), "Status should be 400");
    assert.ok(mockResponse.send.calledWith({ message: "Invalid input" }), "Message should be 'Invalid input'");
  });

  it("missing input", () => {
    const mockResponse = createMockResponse();

    addRouteHandler({ body: { number1: "4" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(400), "Status should be 400");
    assert.ok(mockResponse.send.calledWith({ message: "Invalid input" }), "Message should be 'Invalid input'");
  });
});

describe("subtract", () => {
  it("simple", () => {
    const mockResponse = createMockResponse();

    subtractRouteHandler({ body: { number1: "4", number2: "1" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(200) || mockResponse.status.notCalled, "Status should be 200");
    assert.ok(mockResponse.send.calledWith({ result: 3 }), "Result should be 3");
  });

  it("invalid input", () => {
    const mockResponse = createMockResponse();

    subtractRouteHandler({ body: { number1: "4", number2: "any" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(400), "Status should be 400");
    assert.ok(mockResponse.send.calledWith({ message: "Invalid input" }), "Message should be 'Invalid input'");
  });

  it("missing input", () => {
    const mockResponse = createMockResponse();

    subtractRouteHandler({ body: { number1: "4" } } as Request, mockResponse as Response);

    assert.ok(mockResponse.status.calledWith(400), "Status should be 400");
    assert.ok(mockResponse.send.calledWith({ message: "Invalid input" }), "Message should be 'Invalid input'");
  });
});

import app from "./app.js";

describe("routes", () => {
  // Checks status code and response body and response header type
  it("addition", (_, done) => {
    request(app)
      .post("/add")
      .send(new URLSearchParams({ number1: "8", number2: "9" }).toString())
      .expect((res) => {
        assert.strictEqual(res.type, "application/json");
      })
      .expect(200, { result: 17 }, done);
  });

  // Checks status code and response body and response header type
  it("subtraction", (_, done) => {
    request(app)
      .post("/subtract")
      .send(new URLSearchParams({ number1: "4", number2: "1" }).toString())
      .expect((res) => {
        assert.strictEqual(res.type, "application/json");
      })
      .expect(200, { result: 3 }, done);
  });
});
