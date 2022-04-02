import React, { lazy } from "react";
import "../styles/404.css";
const Layout = lazy(() => import("../components/Layout"));
const Layout2 = lazy(() => import("../components/Layout2"));

function Error404() {
  return (
    <Layout>
      <Layout2>
        <div className="body">
          <section className="star-wars">
            <div className="crawl">
              <div className="title">
                <p>Episode CDIV</p>
                <h1>404 Not Found</h1>
              </div>
              <p>It is a matter of time that our hero are lost in space.</p>
              <br />
              <p>
                During his/her journey, First Order tried to mess with our
                hero's radar and managed to encircle our hero's starship.
              </p>
              <br />
              <p>
                Pursued by the First Order, can our hero return to where he/she
                belong and restore freedom to the galaxy…
              </p>
            </div>
          </section>
        </div>
      </Layout2>
    </Layout>
  );
}

export default Error404;
