import { createFileRoute } from "@tanstack/react-router";
import { LccxShell } from "../lccx/LccxShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms & Liability Waiver | LowCountry Coastal Excursions" }],
  }),
  component: TermsPage,
});

// Waiver text mirrors LowCountry Coastal Excursions' active FareHarbor waiver
// ("Liability Waiver, Assumption of Risk, and Release Agreement"). The signature
// + contact fields are collected at sign time (dock kiosk / e-sign), not shown here.
function TermsPage() {
  return (
    <LccxShell navPage="terms" darkNav>
      <section style={{ background: "var(--cream)", padding: "clamp(40px,7vw,90px) 20px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", color: "var(--body)", lineHeight: 1.6 }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--navy)", fontSize: "clamp(28px,5vw,42px)", marginBottom: 6 }}>
            Terms & Liability Waiver
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            Every guest who boards must sign the Liability Waiver below before the trip — a parent or
            guardian signs for anyone under 18. You'll get a link to sign in your confirmation email,
            and a quick-sign tablet is available at the dock.
          </p>

          <h2 style={h2}>Booking terms</h2>
          <ul style={ul}>
            <li>Prices are in USD; a 3% card surcharge is added at checkout. Private charters are priced for the whole boat by group size; shared trips are priced per person.</li>
            <li>Free cancellation up to 24 hours before departure for a full refund. Inside 24 hours, our cancellation policy applies.</li>
            <li>Trips run when conditions are safe. If the captain cancels for weather or safety, you receive a full refund or reschedule — the captain's safety decision is final.</li>
            <li>Please arrive 15 minutes early. Late arrivals may shorten the trip; no-shows are non-refundable.</li>
          </ul>

          <div style={{ borderTop: "1px solid var(--border)", margin: "32px 0 8px" }} />
          <h2 style={{ ...h2, marginTop: 16 }}>Liability Waiver, Assumption of Risk, and Release Agreement</h2>
          <p style={{ fontWeight: 700, color: "var(--navy)" }}>
            IMPORTANT: THIS IS A LEGALLY BINDING DOCUMENT. READ CAREFULLY BEFORE SIGNING.
          </p>

          <h3 style={h3}>Acknowledgment of risks</h3>
          <p>
            Participant understands and acknowledges that boating, fishing, swimming, wildlife
            observation, and all related activities offered by the Company involve inherent and
            significant risks, including but not limited to:
          </p>
          <ul style={ul}>
            <li>Drowning, slips, trips, or falls</li>
            <li>Sudden movements of the vessel due to waves or weather</li>
            <li>Equipment failure</li>
            <li>Accidental injury by fishing equipment or other participants</li>
            <li>Encounters with wildlife</li>
            <li>Sun exposure, dehydration, motion sickness</li>
            <li>Inaccessibility to immediate medical assistance</li>
          </ul>
          <p>
            Participant understands that these risks may result in property damage, serious personal
            injury, illness, or death. Participant voluntarily and knowingly assumes all such risks,
            whether anticipated or unanticipated.
          </p>

          <h3 style={h3}>Release of liability</h3>
          <p>
            In consideration of being allowed to participate in any chartered activity with the
            Company, Participant, on behalf of themselves, their heirs, executors, administrators,
            assigns, and next of kin, hereby waives, releases, and discharges the Company from any and
            all liability for any claims, causes of action, demands, damages, losses, or expenses
            (including attorney's fees) arising out of or relating to: any personal injury, property
            damage, or wrongful death; participation in activities, services, or use of equipment
            provided by the Company; and the negligence of the Company or any third parties. This
            release applies even if injury or damage is caused by the ordinary negligence of the
            Company.
          </p>

          <h3 style={h3}>Covenant not to sue</h3>
          <p>
            Participant agrees not to initiate any lawsuit or legal action against the Company for any
            claim released by this Agreement. Participant also agrees to indemnify and hold harmless
            the Company from any and all claims brought against it as a result of Participant's conduct
            or participation.
          </p>

          <h3 style={h3}>Bareboat (demise) charter</h3>
          <p>
            For certain excursions involving more than six (6) passengers, the charter may be
            classified as a bareboat (demise) charter in accordance with federal regulations. In such
            cases, the vessel used is not inspected or certified (non-COI) by the U.S. Coast Guard for
            commercial carriage of passengers. To comply with federal law, these charters must be
            designated as bareboat agreements.
          </p>
          <p>
            However, LowCountry Coastal Excursions does provide a qualified U.S. Coast Guard-licensed
            captain for all such charters. The Company assigns a captain based on availability, and the
            captain operates the vessel solely on behalf of the Charterer. The Company bears no
            responsibility for the captain's conduct or decisions once the vessel is demised. This
            arrangement satisfies regulatory requirements while maintaining operational safety and
            guest service quality.
          </p>
          <p>When a trip qualifies as a bareboat charter, the Charterer agrees to:</p>
          <ul style={ul}>
            <li>Operate the vessel in a lawful, safe, and seaworthy manner</li>
            <li>Assume full legal and financial responsibility for the actions of all persons onboard</li>
            <li>Maintain compliance with all U.S. Coast Guard and local regulations</li>
          </ul>
          <p>Charterer shall further indemnify and hold harmless the Company from any and all liability related to:</p>
          <ul style={ul}>
            <li>Damage or loss to the vessel, equipment, or third-party property</li>
            <li>Injury, death, or illness sustained by any person onboard during the charter</li>
            <li>Environmental violations or pollution events</li>
            <li>Any breach of law, insurance requirements, or this Agreement</li>
          </ul>

          <h3 style={h3}>Medical declaration</h3>
          <p>Participant affirms that they:</p>
          <ul style={ul}>
            <li>Are in good health and physically capable of participating in the activities</li>
            <li>Do not have any medical condition that would impair their ability to safely participate</li>
            <li>Will immediately notify the Company if any such conditions arise</li>
          </ul>
          <p>
            Participant authorizes the Company to provide or secure emergency medical treatment if
            necessary, at the Participant's sole expense.
          </p>

          <h3 style={h3}>Parental consent (if under 18)</h3>
          <p>
            If the Participant is a minor, a parent or legal guardian must sign. By signing, the
            parent/guardian consents to the minor's participation, agrees to all terms of this
            Agreement on behalf of the minor, and releases all claims the minor or their
            representatives may have.
          </p>

          <h3 style={h3}>Photo & media release</h3>
          <p>
            Participant grants the Company permission to use any photographs, video, or recordings
            taken during the charter for marketing, advertising, and promotional purposes, without
            compensation or additional approval.
          </p>

          <h3 style={h3}>Severability</h3>
          <p>
            If any portion of this Agreement is deemed invalid or unenforceable, the remaining
            provisions shall remain in full force and effect.
          </p>

          <h3 style={h3}>Governing law</h3>
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of the State
            of South Carolina, and where applicable, the admiralty and maritime laws of the United
            States of America. Venue for any legal proceeding shall lie exclusively in Charleston
            County, SC.
          </p>

          <h3 style={h3}>Entire agreement</h3>
          <p>
            This Agreement constitutes the entire understanding between Participant and the Company and
            supersedes all prior representations. In the case of a bareboat charter, this waiver shall
            be deemed supplemental to the formal Charter Agreement executed separately and shall not
            supersede specific terms thereof.
          </p>

          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 24 }}>
            Each guest signs this waiver (name, contact details, and signature) before boarding.
            Questions? Call (843) 508-1600.
          </p>
        </div>
      </section>
    </LccxShell>
  );
}

const h2: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  color: "var(--navy)",
  fontSize: 24,
  marginTop: 28,
  marginBottom: 8,
};
const h3: React.CSSProperties = {
  color: "var(--navy)",
  fontSize: 17,
  fontWeight: 800,
  marginTop: 22,
  marginBottom: 6,
};
const ul: React.CSSProperties = { paddingLeft: 18, display: "grid", gap: 6, margin: "6px 0" };
