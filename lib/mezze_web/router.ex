defmodule MezzeWeb.Router do
  use MezzeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", MezzeWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  forward "/graphql", Absinthe.Plug,
    schema: MezzeWeb.Schema
end
