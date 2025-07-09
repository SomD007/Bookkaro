import React, { useEffect, useCallback, useRef } from "react";
import "./Gallery.css";

const Gallery = () => {
  const currentCategoryRef = useRef("all");

  const filterCategory = useCallback((category) => {
    currentCategoryRef.current = category;
    const cards = document.querySelectorAll(".event-card");
    document.querySelectorAll("input[name='time'][value='all']")[0].checked = true;

    if (category === "all") {
      cards.forEach((card) => {
        card.style.display = card.classList.contains("default-show") ? "block" : "none";
      });
    } else {
      let count = 0;
      cards.forEach((card) => {
        if (card.classList.contains(category)) {
          card.style.display = count < 4 ? "block" : "none";
          count++;
        } else {
          card.style.display = "none";
        }
      });
    }
  }, []);

  const filterTime = (value) => {
    const cards = document.querySelectorAll(".event-card");
    let count = 0;

    cards.forEach((card) => {
      if (value === "all") {
        filterCategory(currentCategoryRef.current);
      } else if (card.classList.contains(value)) {
        card.style.display = count < 4 ? "block" : "none";
        count++;
      } else {
        card.style.display = "none";
      }
    });
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".event-card");
    document.querySelectorAll("input[name='time'][value='all']")[0].checked = true;
    cards.forEach((card) => {
      card.style.display = card.classList.contains("default-show") ? "block" : "none";
    });
  }, [filterCategory]);

  return (
    <div className="gallery-container">
      <h1 className="title">Event Gallery</h1>

      <div className="filter-buttons">
        <button onClick={() => filterCategory("all")}>All</button>
        <button onClick={() => filterCategory("wedding")}>Wedding</button>
        <button onClick={() => filterCategory("anniversary")}>Anniversary</button>
        <button onClick={() => filterCategory("birthday")}>Birthday Party</button>
        <button onClick={() => filterCategory("coding")}>Coding Event</button>
      </div>

      <div className="sub-filter">
        <label>
          <input
            type="radio"
            name="time"
            value="all"
            defaultChecked
            onChange={(e) => filterTime(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="time"
            value="recent"
            onChange={(e) => filterTime(e.target.value)}
          />
          Recent Work
        </label>
        <label>
          <input
            type="radio"
            name="time"
            value="old"
            onChange={(e) => filterTime(e.target.value)}
          />
          Old Work
        </label>
      </div>

      <div className="gallery" id="gallery">
        {/* Event Cards (All 20+) */}
        <div className="event-card wedding recent default-show">
          <img src="/img/wed2.wedp.webp" alt="Wedding Event" />
          <div className="info">
            <h3>Wedding Event</h3>
            <p>Date: 2025-07-02</p>
            <span className="recent-tag">Recently Executed</span>
          </div>
        </div>

        <div className="event-card anniversary recent default-show">
          <img src="/img/anni.jpg" alt="Anniversary Event" />
          <div className="info">
            <h3>Anniversary Event</h3>
            <p>Date: 2025-07-05</p>
            <span className="recent-tag">Recently Executed</span>
          </div>
        </div>

        <div className="event-card birthday recent default-show">
          <img src="/img/birth2.jpg" alt="Birthday Event" />
          <div className="info">
            <h3>Birthday Party</h3>
            <p>Date: 2025-07-01</p>
            <span className="recent-tag">Recently Executed</span>
          </div>
        </div>

        <div className="event-card coding recent default-show">
          <img src="/img/code2,jpg.jpg" alt="Coding Event" />
          <div className="info">
            <h3>Coding Event</h3>
            <p>Date: 2025-07-04</p>
            <span className="recent-tag">Recently Executed</span>
          </div>
        </div>

        <div className="event-card wedding recent">
          <img src="/img/wed.jpg" alt="Wedding 2" />
          <div className="info"><h3>Wedding Function</h3><p>Date: 2025-06-29</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card wedding old">
          <img src="/img/wed2.jpg" alt="Wedding 3" />
          <div className="info"><h3>Old Wedding</h3><p>Date: 2023-11-20</p></div>
        </div>

        <div className="event-card wedding recent">
          <img src="/img/wed3.jpg" alt="Wedding 4" />
          <div className="info"><h3>Modern Wedding</h3><p>Date: 2025-06-10</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card wedding old">
          <img src="/img/wed5.jpg" alt="Wedding 5" />
          <div className="info"><h3>Royal Wedding</h3><p>Date: 2022-10-11</p></div>
        </div>

        <div className="event-card anniversary recent">
          <img src="/img/anni.jpg" alt="Anniversary 2" />
          <div className="info"><h3>Anniversary Gala</h3><p>Date: 2025-06-30</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card anniversary old">
          <img src="/img/anni2.jpg" alt="Anniversary 3" />
          <div className="info"><h3>Classic Anniversary</h3><p>Date: 2023-12-25</p></div>
        </div>

        <div className="event-card anniversary old">
          <img src="/img/anni3.jpg" alt="Anniversary 4" />
          <div className="info"><h3>Anniversary Special</h3><p>Date: 2022-10-10</p></div>
        </div>

        <div className="event-card anniversary recent">
          <img src="/img/anni4.jpeg" alt="Anniversary 5" />
          <div className="info"><h3>Recent Anniversary</h3><p>Date: 2025-06-12</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card birthday recent">
          <img src="/img/birth.jpg" alt="Birthday 2" />
          <div className="info"><h3>Birthday Bash</h3><p>Date: 2025-06-15</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card birthday old">
          <img src="/img/birth5.jpg" alt="Birthday 3" />
          <div className="info"><h3>Past Birthday</h3><p>Date: 2023-01-10</p></div>
        </div>

        <div className="event-card birthday old">
          <img src="/img/birth3.jpg" alt="Birthday 4" />
          <div className="info"><h3>Old Birthday Bash</h3><p>Date: 2022-08-18</p></div>
        </div>

        <div className="event-card birthday recent">
          <img src="/img/birth4.jpg" alt="Birthday 5" />
          <div className="info"><h3>Fun Birthday</h3><p>Date: 2025-06-20</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card coding old">
          <img src="/img/code.jpg" alt="Coding 2" />
          <div className="info"><h3>Coding Sprint</h3><p>Date: 2023-03-11</p></div>
        </div>

        <div className="event-card coding recent">
          <img src="/img/code2.jpg" alt="Coding 3" />
          <div className="info"><h3>CodeHack</h3><p>Date: 2025-06-28</p><span className="recent-tag">Recently Executed</span></div>
        </div>

        <div className="event-card coding old">
          <img src="/img/code3.jpg" alt="Coding 4" />
          <div className="info"><h3>Old Code Event</h3><p>Date: 2022-09-19</p></div>
        </div>

        <div className="event-card coding recent">
          <img src="/img/code4.jpg" alt="Coding 5" />
          <div className="info"><h3>Recent Code</h3><p>Date: 2025-06-18</p><span className="recent-tag">Recently Executed</span></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;