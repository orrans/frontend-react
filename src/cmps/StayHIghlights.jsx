import { CheckIn, GreatLocation, RemoteWork } from './icons/highlights'

export function StayHighlights() {
  return (
    <section className="stay-highlights">
      <div className="highlight">
        <span className="icon"><GreatLocation /></span>
        <div>
          <h4>Great location</h4>
          <p>Guests who stayed here in the past year loved the location.</p>
        </div>
      </div>

      <div className="highlight">
        <span className="icon"><CheckIn /></span>
        <div>
          <h4>Self check-in</h4>
          <p>You can check in with the building staff.</p>
        </div>
      </div>

      <div className="highlight">
        <span className="icon"><RemoteWork /></span>
        <div>
          <h4>Great for remote work</h4>
          <p>Fast wifi at 52 Mbps, plus a dedicated workspace.</p>
        </div>
      </div>
    </section>
  )
}
