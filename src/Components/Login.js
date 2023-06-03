import React from "react";
import style from "./Login.module.css";

export const Login = () => {
  return (
    <div class={style.login}>
      <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class={style.container}>
          <a class={style.navbarbrand} href="/sign-in">
            positronX
          </a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav ml-auto">
              <li class={style.navitem}>
                <a class={style.navlink} href="/sign-in">
                  Login
                </a>
              </li>
              <li class={style.navitem}>
                <a class={style.navlink} href="/sign-up">
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class={style.authwrapper}>
        <div class={style.authinner}>
          <form>
            <h3>Sign In</h3>
            <div class={style.mb3}>
              <label>Email address</label>
              <input
                type="email"
                class={style.formcontrol}
                placeholder="Enter email"
              />
            </div>
            <div class={style.mb3}>
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
              />
            </div>
            <div class={style.mb3}>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="customControlInput"
                  id="customCheck1"
                />
                <label class={style.customControlLabel} for="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
            <p class="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
