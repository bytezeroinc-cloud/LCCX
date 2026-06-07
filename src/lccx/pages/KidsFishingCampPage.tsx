import { type ChangeEvent, type FormEvent, useState } from "react";
import kidsFishingHero from "../../assets/lccx/kids-fishing-camp-hero.jpg";
import kidsFishingCatch from "../../assets/lccx/kids-fishing-camp-catch.webp";
import kidsFishingBoat from "../../assets/lccx/kids-fishing-camp-boat.jpeg";
import { LccxHeroBanner } from "../components/LccxHeroBanner";
import {
  Badge,
  Btn,
  Container,
  Icon,
  Placeholder,
  SectionLabel,
  SectionWave,
} from "../components/Primitives";
import { QuickFactsBar, DepartureTimes, WeatherBring, MapDirections } from "../components/TourSections";

const KIDS_QUICK = [
  { icon: "calendar", k: "Format", v: "5-day camp" },
  { icon: "users", k: "Ages", v: "7–13 years" },
  { icon: "clock", k: "Daily", v: "8 AM – 2 PM" },
  { icon: "gift", k: "Price", v: "$1,250 / group" },
  { icon: "fish", k: "Focus", v: "Fishing & marine life" },
  { icon: "pin", k: "Meets at", v: "Shem Creek, Mt. Pleasant" },
];

const KIDS_SESSIONS = [
  { season: "Session 1", sunset: "Jun 15–19, 2026", depart: "8:00 AM" },
  { season: "Session 2", sunset: "Jul 6–11, 2026", depart: "8:00 AM" },
  { season: "Session 3", sunset: "Jul 20–25, 2026", depart: "8:00 AM" },
];

const KIDS_BRING = [
  "Sunscreen, a hat & sunglasses",
  "A refillable water bottle",
  "Closed-toe shoes that can get wet",
  "A packed lunch & snacks",
  "A towel & a change of clothes",
];

const CAMP_WEEKS = ["June 1–5", "June 15–19", "July 6–10", "July 20–24"];

const CAMP_STATS = [
  { icon: "users", label: "Ages", value: "7–13" },
  { icon: "clock", label: "Schedule", value: "Mon–Fri · 8 AM–2 PM" },
  { icon: "pin", label: "Location", value: "100 Church Street, Mount Pleasant" },
  { icon: "star", label: "Tuition", value: "$1,250 per camper + tax" },
];

const LEARNING_BLOCKS = [
  {
    icon: "fish",
    title: "Real fishing skills",
    body: "Daily boat trips target redfish, trout, flounder, sheepshead, and more while campers learn to cast, hook, fight, and safely release fish.",
  },
  {
    icon: "shield",
    title: "Boat safety & confidence",
    body: "Captains teach how to move around the boat, listen for instructions, handle gear, and feel steady on the water.",
  },
  {
    icon: "anchor",
    title: "Bait, knots & tackle",
    body: "Kids practice throwing cast nets, catching bait, tying simple knots, rigging rods, and comparing live bait with artificial lures.",
  },
  {
    icon: "leaf",
    title: "Marine life & conservation",
    body: "Campers learn about Charleston fish, birds, wildlife, catch-and-release, and why the Lowcountry ecosystem deserves respect.",
  },
];

const SAMPLE_WEEK = [
  {
    day: "Day 1",
    icon: "shield",
    title: "Safety, gear, and first casts",
    points: [
      "Meet captains and crew",
      "Life jacket fitting",
      "Intro to rods, reels, tackle",
      "Inshore fishing around Shem Creek",
    ],
  },
  {
    day: "Day 2",
    icon: "leaf",
    title: "Fish ID & conservation",
    points: [
      "Identify redfish, trout, flounder, and sheepshead",
      "Catch-and-release basics",
      "Gentle fish handling",
      "Afternoon fishing practice",
    ],
  },
  {
    day: "Day 3",
    icon: "compass",
    title: "New techniques & new spots",
    points: [
      "Explore different inshore locations",
      "Try new presentations",
      "Practice casting accuracy",
      "Read current, structure, and water",
    ],
  },
  {
    day: "Day 4",
    icon: "anchor",
    title: "Bigger fish & shark tooth adventure",
    points: [
      "Bottom fishing for larger species",
      "Safe shark handling and release",
      "Shark tooth and shell hunting",
      "Explore flats or creeks",
    ],
  },
  {
    day: "Day 5",
    icon: "star",
    title: "Tournament day & celebration",
    points: [
      "Friendly camp tournament",
      "Lunch provided by captains",
      "Crabbing and dock games",
      "Awards, photos, and final pickup",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What if my child has never fished before?",
    a: "That’s totally fine. Many campers are beginners. We start with the basics and keep the atmosphere relaxed and encouraging.",
  },
  {
    q: "Does my child need to know how to swim?",
    a: "Basic water comfort is helpful, but every child wears a Coast Guard–approved life jacket and is closely supervised by captains and crew.",
  },
  {
    q: "What should my child bring each day?",
    a: "Comfortable clothes that can get wet, a hat, sunglasses, sunscreen, reusable water bottle, and a packed lunch Monday through Thursday. Closed-toe shoes or secure sandals are recommended.",
  },
  {
    q: "Can siblings or friends be on the same boat?",
    a: "We do our best to honor sibling and friend requests whenever possible. Mention it when you register.",
  },
  {
    q: "What happens if weather is bad?",
    a: "Safety comes first. If a full day looks unsafe, parents are contacted about make-up options or a prorated refund. If storms pop up, campers move to a covered dock for land-based activities.",
  },
  {
    q: "Are rods, bait, and life jackets included?",
    a: "Yes. Camp tuition includes rods, reels, tackle, bait, life jackets, and the core fishing gear campers use throughout the week.",
  },
  {
    q: "How many kids are in each camp week?",
    a: "Seats are intentionally limited so captains can keep instruction hands-on, organized, and safe on the boat.",
  },
  {
    q: "Can my child attend more than one week?",
    a: "Yes, if space is available. Many campers enjoy returning because fishing locations, species, tides, and daily conditions change each week.",
  },
];

const CAMP_SNIPPETS = [
  {
    title: "On-the-water coaching",
    body: "Captains teach by doing — casting, baiting hooks, reading current, and building confidence one catch at a time.",
    icon: "anchor",
    image: kidsFishingBoat,
  },
  {
    title: "Catch, photo, release",
    body: "Campers learn safe fish handling, quick photos, and conservation-minded release habits they can use for life.",
    icon: "camera",
    image: kidsFishingCatch,
  },
];

const QUESTION_TOPICS = [
  { icon: "calendar", label: "Dates" },
  { icon: "users", label: "Siblings" },
  { icon: "shield", label: "Safety" },
  { icon: "fish", label: "Experience" },
];

const PARENT_QUOTES = [
  {
    initials: "MB",
    name: "Megan B.",
    detail: "Parent of 9-year-old camper",
    quote:
      "He came home every afternoon exhausted, salty, and already talking about the next morning. The captains made him feel confident right away.",
  },
  {
    initials: "JR",
    name: "Jason R.",
    detail: "Parent of two campers",
    quote:
      "The small group format was exactly what we wanted. Both kids learned real fishing skills and felt safe the whole week.",
  },
  {
    initials: "AK",
    name: "Ashley K.",
    detail: "First-time camp parent",
    quote:
      "This was the highlight of summer. Great communication, great photos, and a perfect break from screens.",
  },
];

export function KidsFishingCampPage({ onBook }: { onBook?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [questionSent, setQuestionSent] = useState(false);
  const [questionForm, setQuestionForm] = useState({
    name: "",
    phone: "",
    email: "",
    question: "",
  });

  const setQuestionField =
    (field: keyof typeof questionForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestionForm((form) => ({ ...form, [field]: event.target.value }));
    };

  const handleQuestionSubmit = (event: FormEvent) => {
    event.preventDefault();
    setQuestionSent(true);
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "14px 15px",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    color: "var(--navy)",
    background: "#fff",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  return (
    <div>
      <LccxHeroBanner
        images={[
          {
            src: kidsFishingHero,
            alt: "Kids fishing camp on Shem Creek in Charleston",
            position: "center 34%",
          },
          {
            src: kidsFishingCatch,
            alt: "Young camper holding a small shark on a Charleston fishing charter",
            position: "center 38%",
          },
          {
            src: kidsFishingBoat,
            alt: "Kids fishing from a Lowcountry Coastal Excursions boat",
            position: "center 46%",
          },
        ]}
        title="Kids Fishing Camp"
        accentTitle="on Shem Creek."
        subtitle="More sunshine, less screen time — a hands-on Charleston youth fish camp for ages 7–13 with real fishing, boat safety, conservation, and confidence-building days on the water."
        ctaLabel="Book Camp"
        ctaIcon="fish"
        onCta={onBook}
        proofItems={[
          { icon: "users", label: "Ages 7–13" },
          { icon: "calendar", label: "4 Summer Sessions" },
          { icon: "clock", label: "Mon–Fri · 8 AM–2 PM" },
          { icon: "shield", label: "USCG Captains" },
        ]}
      />

      <QuickFactsBar items={KIDS_QUICK} />

      <section style={{ background: "#fff", padding: "94px 0" }}>
        <Container>
          <div
            className="kids-camp-glance"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 54,
              alignItems: "center",
            }}
          >
            <div>
              <SectionLabel align="left">Fish Camp at a Glance</SectionLabel>
              <h2 style={{ marginTop: 16, maxWidth: 640 }}>
                A week outside, moving, learning, and coming home tired in the best way.
              </h2>
              <p className="lead" style={{ marginTop: 18, maxWidth: 620 }}>
                LowCountry Coastal Excursions’ Youth Fish Camp is based out of Shem Creek in Mount
                Pleasant. Campers spend each day with our captains learning real fishing skills,
                boating safety, and respect for the Lowcountry’s coastal ecosystem.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 12,
                  marginTop: 34,
                }}
                className="kids-camp-stat-grid"
              >
                {CAMP_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 16,
                      padding: "18px",
                      display: "grid",
                      gridTemplateColumns: "42px 1fr",
                      gap: 14,
                      alignItems: "center",
                      boxShadow: "0 12px 34px rgba(10,27,48,0.06)",
                    }}
                  >
                    <span
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        background: "var(--sand)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon name={stat.icon} size={18} color="var(--accent)" />
                    </span>
                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          color: "var(--muted)",
                          fontWeight: 800,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: ".12em",
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        style={{
                          color: "var(--navy)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 850,
                          fontSize: 18,
                          lineHeight: 1.15,
                          marginTop: 5,
                        }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  borderRadius: 22,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "var(--shadow-lift)",
                }}
              >
                <img
                  src={kidsFishingCatch}
                  alt="Camper showing a catch during youth fish camp"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {CAMP_WEEKS.map((week, index) => (
                  <div
                    key={week}
                    style={{
                      background: "var(--navy)",
                      color: "#fff",
                      borderRadius: 14,
                      padding: "13px 10px",
                      textAlign: "center",
                      minHeight: 72,
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 12px 26px rgba(10,27,48,0.12)",
                    }}
                  >
                    <div>
                      <Icon name="calendar" size={15} color="var(--accent-2)" />
                      <div
                        style={{
                          color: "var(--accent-2)",
                          fontSize: 11,
                          fontWeight: 850,
                          marginTop: 5,
                        }}
                      >
                        Week {index + 1}
                      </div>
                      <div
                        style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.15, marginTop: 4 }}
                      >
                        {week}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--sand)" height={70} />

      <section style={{ background: "var(--sand)", padding: "84px 0 24px" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 28px" }}>
            <SectionLabel style={{ justifyContent: "center" }}>Parent Notes</SectionLabel>
            <h2 style={{ marginTop: 14 }}>
              Campers are not the only ones who feel good about the week.
            </h2>
            <div style={{ marginTop: 18 }}>
              <Btn variant="secondary" onClick={onBook}>
                Save a Seat →
              </Btn>
            </div>
          </div>
          <div
            className="kids-testimonial-strip"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {PARENT_QUOTES.map((item) => (
              <article
                key={item.name}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 14px 34px rgba(10,27,48,0.07)",
                }}
              >
                <Icon name="message" size={22} color="var(--accent)" />
                <p
                  style={{
                    color: "var(--navy)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 750,
                    fontSize: 18,
                    lineHeight: 1.45,
                    marginTop: 18,
                  }}
                >
                  “{item.quote}”
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 22 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--navy)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 850,
                      fontSize: 13,
                    }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div style={{ color: "var(--navy)", fontWeight: 850 }}>{item.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ background: "var(--sand)", padding: "94px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <SectionLabel>What Kids Learn</SectionLabel>
            <h2 style={{ marginTop: 16 }}>Hands-on all week long.</h2>
          </div>
          <div
            className="kids-learning-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}
          >
            {LEARNING_BLOCKS.map((item) => (
              <article
                key={item.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "rgba(255,122,26,0.10)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon name={item.icon} size={22} color="var(--accent)" />
                </span>
                <h3 style={{ marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SectionWave from="var(--sand)" to="var(--navy)" height={80} />

      <section style={{ background: "var(--navy)", padding: "98px 0", color: "#fff" }}>
        <Container>
          <div
            className="kids-week-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "0.82fr 1.18fr",
              gap: 54,
              alignItems: "start",
            }}
          >
            <div style={{ position: "sticky", top: 120 }}>
              <SectionLabel color="var(--accent-2)" align="left">Sample Week</SectionLabel>
              <h2 style={{ color: "#fff", marginTop: 16 }}>From first casts to tournament day.</h2>
              <p style={{ color: "rgba(255,255,255,0.76)", marginTop: 18, fontSize: 17 }}>
                Every day includes boat time, skill-building, lunch, and supervised waterway
                adventure. We practice catch-and-release throughout the week.
              </p>
              <div
                style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4/3", marginTop: 30 }}
              >
                <img
                  src={kidsFishingBoat}
                  alt="Campers fishing from the boat during a sample camp day"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
                <Btn onClick={onBook}>Book a Week →</Btn>
                <Btn
                  variant="secondary"
                  onDark
                  onClick={() => (window.location.href = "tel:+18435081600")}
                >
                  <Icon name="phone" size={16} /> Ask a Captain
                </Btn>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {SAMPLE_WEEK.map((day) => (
                <article
                  key={day.day}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 16,
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "54px 1fr",
                    gap: 18,
                  }}
                  className="kids-week-card"
                >
                  <span
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 16,
                      background: "rgba(239,190,114,0.13)",
                      border: "1px solid rgba(239,190,114,0.28)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name={day.icon} size={23} color="var(--accent-2)" />
                  </span>
                  <div>
                    <Badge variant="gold">{day.day}</Badge>
                    <h3 style={{ color: "#fff", marginTop: 12 }}>{day.title}</h3>
                    <ul
                      style={{
                        margin: "14px 0 0",
                        padding: 0,
                        listStyle: "none",
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 10,
                      }}
                      className="kids-day-list"
                    >
                      {day.points.map((point) => (
                        <li
                          key={point}
                          style={{
                            display: "flex",
                            gap: 8,
                            color: "rgba(255,255,255,0.78)",
                            fontSize: 14,
                            lineHeight: 1.45,
                          }}
                        >
                          <Icon
                            name="check"
                            size={15}
                            color="var(--accent-2)"
                            style={{ flexShrink: 0, marginTop: 2 }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionWave from="var(--navy)" to="#fff" height={70} />

      <section style={{ background: "#fff", padding: "88px 0" }}>
        <Container>
          <div
            className="kids-snippet-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}
          >
            {CAMP_SNIPPETS.map((snippet) => (
              <article
                key={snippet.title}
                style={{
                  position: "relative",
                  minHeight: 360,
                  borderRadius: 22,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  boxShadow: "var(--shadow-lift)",
                  backgroundImage: `linear-gradient(180deg, rgba(10,27,48,0.12), rgba(10,27,48,0.84)), url(${snippet.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div style={{ padding: 30, color: "#fff" }}>
                  <span
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.16)",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Icon name={snippet.icon} size={22} color="var(--accent-2)" />
                  </span>
                  <h2 style={{ color: "#fff" }}>
                    {snippet.title}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 470, marginTop: 10 }}>
                    {snippet.body}
                  </p>
                  <div style={{ marginTop: 22 }}>
                    <Btn onClick={onBook}>Check Availability →</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section style={{ background: "#fff", padding: "94px 0" }}>
        <Container>
          <div
            className="kids-info-layout"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
          >
            <article
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "34px",
              }}
            >
              <SectionLabel align="left">Safety First</SectionLabel>
              <h2 style={{ marginTop: 14 }}>
                Parents should feel as confident as campers do.
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "24px 0 0",
                  display: "grid",
                  gap: 13,
                }}
              >
                {[
                  "U.S. Coast Guard–certified captains run every trip",
                  "Coast Guard–approved life jackets for every camper",
                  "Modern, well-maintained boats",
                  "Small camper-to-captain ratios",
                  "Weather monitored throughout the day",
                  "Clear communication with parents",
                ].map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: 10, color: "var(--body)", fontWeight: 600 }}
                  >
                    <Icon
                      name="shield"
                      size={17}
                      color="var(--accent)"
                      style={{ flexShrink: 0, marginTop: 3 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article
              style={{
                background: "var(--sand)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "34px",
              }}
            >
              <SectionLabel align="left">Tuition & Policies</SectionLabel>
              <h2 style={{ marginTop: 14 }}>
                Small groups mean limited seats.
              </h2>
              <div style={{ display: "grid", gap: 18, marginTop: 24 }}>
                {[
                  ["Tuition", "$1,250 per camper plus tax for the full week."],
                  [
                    "Included",
                    "Fishing gear, bait, rods, reels, life jackets, and a Youth Fish Camp T-shirt.",
                  ],
                  ["Lunch", "Campers bring lunch Monday–Thursday; lunch is provided Friday."],
                  [
                    "Cancellations",
                    "Cancellations within 30 days of camp start are non-refundable due to limited boat space.",
                  ],
                  [
                    "Registration",
                    "Online registration does not automatically guarantee a spot; availability is confirmed after submission.",
                  ],
                ].map(([label, body]) => (
                  <div key={label}>
                    <h3 style={{ color: "var(--navy)", marginBottom: 4 }}>{label}</h3>
                    <p style={{ fontSize: 14 }}>{body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <Btn onClick={onBook}>Start Registration →</Btn>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <SectionWave from="#fff" to="var(--sand)" height={70} />

      <section style={{ background: "var(--sand)", padding: "94px 0" }}>
        <Container>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 40px" }}>
            <SectionLabel style={{ justifyContent: "center" }}>FAQ</SectionLabel>
            <h2 style={{ marginTop: 16 }}>Common parent questions.</h2>
            <p style={{ marginTop: 14 }}>
              Click Book Camp to start registration, then watch for confirmation from our team
              once your camper’s seat is secured.
            </p>
            <div style={{ marginTop: 22 }}>
              <Btn onClick={onBook}>Book Camp →</Btn>
            </div>
          </div>
          <div className="kids-faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
              {FAQ_ITEMS.map((item, index) => {
                const open = openFaq === index;
                return (
                  <article
                    key={item.q}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 16,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : index)}
                      style={{
                        width: "100%",
                        border: 0,
                        background: "transparent",
                        padding: "20px 22px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 18,
                        cursor: "pointer",
                        textAlign: "left",
                        color: "var(--navy)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: 17,
                      }}
                    >
                      {item.q}
                      <Icon name={open ? "minus" : "plus"} size={18} color="var(--accent)" />
                    </button>
                    {open ? (
                      <p style={{ padding: "0 22px 22px", color: "var(--body)", fontSize: 15 }}>
                        {item.a}
                      </p>
                    ) : null}
                  </article>
                );
              })}
          </div>
        </Container>
      </section>

      <section style={{ background: "var(--sand)", padding: "0 0 94px" }}>
        <Container>
          <div
            className="kids-question-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "0.9fr 1.1fr",
              gap: 36,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                borderRadius: 22,
                overflow: "hidden",
                minHeight: 460,
                backgroundImage: `linear-gradient(180deg, rgba(10,27,48,0.08), rgba(10,27,48,0.78)), url(${kidsFishingHero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-end",
                boxShadow: "var(--shadow-lift)",
              }}
            >
              <div style={{ padding: 34, color: "#fff" }}>
                <SectionLabel color="var(--accent-2)" align="left">Still deciding?</SectionLabel>
                <h2 style={{ color: "#fff", marginTop: 14 }}>Ask us anything before camp week.</h2>
                <p style={{ color: "rgba(255,255,255,0.82)", marginTop: 14 }}>
                  Call or text <strong>(843) 508-1600</strong>, or send a quick question and we’ll
                  help with dates, readiness, gear, and logistics.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 10,
                    marginTop: 24,
                  }}
                  className="kids-topic-grid"
                >
                  {QUESTION_TOPICS.map((topic) => (
                    <div
                      key={topic.label}
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        borderRadius: 14,
                        padding: "13px 8px",
                        textAlign: "center",
                      }}
                    >
                      <Icon name={topic.icon} size={18} color="var(--accent-2)" />
                      <div style={{ fontSize: 12, fontWeight: 800, marginTop: 7 }}>
                        {topic.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 22,
                padding: "34px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {questionSent ? (
                <div
                  style={{
                    minHeight: 390,
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <Icon name="check" size={42} color="var(--accent)" />
                    <h2 style={{ marginTop: 16 }}>Question received.</h2>
                    <p style={{ margin: "10px auto 24px", maxWidth: 390 }}>
                      We’ll follow up soon. For anything time-sensitive, call or text (843)
                      508-1600.
                    </p>
                    <Btn onClick={() => setQuestionSent(false)}>Ask Another Question</Btn>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuestionSubmit}>
                  <SectionLabel align="left">Parent Question Form</SectionLabel>
                  <h2 style={{ marginTop: 14 }}>
                    Need help choosing a week?
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                      marginTop: 24,
                    }}
                    className="kids-form-row"
                  >
                    <input
                      required
                      value={questionForm.name}
                      onChange={setQuestionField("name")}
                      placeholder="Parent name"
                      style={inputStyle}
                    />
                    <input
                      required
                      type="tel"
                      value={questionForm.phone}
                      onChange={setQuestionField("phone")}
                      placeholder="Phone number"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <input
                      required
                      type="email"
                      value={questionForm.email}
                      onChange={setQuestionField("email")}
                      placeholder="Email address"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <textarea
                      required
                      rows={6}
                      value={questionForm.question}
                      onChange={setQuestionField("question")}
                      placeholder="What would you like to know about Kids Fishing Camp?"
                      style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
                    <Btn>Send Question →</Btn>
                    <Btn
                      variant="secondary"
                      onClick={() => (window.location.href = "tel:+18435081600")}
                    >
                      {" "}
                      <Icon name="phone" size={16} /> Call Now
                    </Btn>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      <DepartureTimes
        kicker="2026 Camp Sessions"
        title={<>Reserve a <span style={{ color: "var(--accent)" }}>summer session.</span></>}
        intro={<>Each session runs Monday–Friday, 8:00 AM to 2:00 PM, for ages 7–13. Spots are limited — reserve your week below or call to confirm the latest dates.</>}
        col2="Dates"
        col3="Daily start"
        rows={KIDS_SESSIONS}
        note="Additional sessions may be added — call (843) 508-1600 to confirm current dates and availability."
        onBook={onBook}
        bg="#fff"
      />

      <WeatherBring
        title="Send them ready for the day."
        bringTitle="Pack this for camp"
        bring={KIDS_BRING}
        blurb="Live Charleston Harbor conditions. Camp runs in summer on the calm inshore waters with USCG-licensed captains. Sessions run rain or shine; we only pause for unsafe weather."
        bg="var(--sand)"
      />

      <MapDirections
        kicker="Where Camp Meets"
        intro="Camp meets each morning at Shem Creek in Mt. Pleasant — about 14 minutes from downtown Charleston. Drop-off is 8:00 AM and pickup is 2:00 PM, Monday through Friday."
        arriveNote="Drop-off 8:00 AM · pickup 2:00 PM, Mon–Fri."
        bg="var(--cream)"
      />

      <section
        style={{
          position: "relative",
          minHeight: 420,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <Placeholder
          kind="kidsfishing"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,27,48,0.68)" }} />
        <Container
          style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "88px 0" }}
        >
          <h2
            style={{
              color: "#fff",
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            More saltwater. Less screen time.
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.78)",
              margin: "18px auto 28px",
              maxWidth: 640,
              fontSize: 18,
            }}
          >
            Youth Fish Camp on Shem Creek will be the highlight of their summer.
          </p>
          <Btn onClick={onBook}>Reserve a Camp Spot →</Btn>
        </Container>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .kids-camp-glance, .kids-week-layout, .kids-info-layout, .kids-faq-grid, .kids-snippet-grid, .kids-question-layout, .kids-testimonial-strip { grid-template-columns: 1fr !important; }
          .kids-learning-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .kids-week-layout > div:first-child { position: relative !important; top: auto !important; }
        }
        @media (max-width: 640px) {
          .kids-camp-stat-grid, .kids-learning-grid, .kids-day-list, .kids-topic-grid, .kids-form-row { grid-template-columns: 1fr !important; }
          .kids-week-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
