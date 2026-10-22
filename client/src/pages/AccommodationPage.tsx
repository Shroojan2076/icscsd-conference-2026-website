import React from 'react';
import { MapPin, ExternalLink, Plane, Train, Bus, Compass, Building, Info } from 'lucide-react';
import { useBootstrap } from '../api/client';

export const AccommodationPage: React.FC = () => {
  const { data } = useBootstrap();
  const hotels = data.hotels || [];
  const attractions = data.attractions || [];

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="badge badge--warning">Host City & Travel Guide</span>
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-navy-950)', marginTop: '8px' }}>
            Accommodation & Travel in Pune
          </h1>
          <p>
            Recommended accommodation partners near VIT Pune (Bibwewadi campus), iconic cultural attractions across Pune, and transit directions from airport and rail hubs.
          </p>
        </div>

        {/* How to Reach VIT Pune Card */}
        <div className="policy-card" style={{ marginBottom: 'var(--space-10)', borderLeft: '4px solid var(--color-ieee-blue)' }}>
          <div className="policy-card__header">
            <Compass size={24} style={{ color: 'var(--color-ieee-blue)' }} />
            <h2 className="policy-card__title">
              How to Reach Vishwakarma Institute of Technology (VIT), Pune
            </h2>
          </div>
          <p className="policy-card__body" style={{ marginBottom: '16px' }}>
            Venue Address: <strong>Vishwakarma Institute of Technology, 666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra – 411037, India.</strong>
          </p>

          <div className="grid-3" style={{ gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-ieee-blue)', fontWeight: 700, marginBottom: '6px' }}>
                <Plane size={18} />
                <span>By Air</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                <strong>Pune International Airport (PNQ, Lohegaon)</strong> is approximately <strong>16 km</strong> from the VIT campus. App-based taxis (Uber/Ola) and prepaid airport cabs are readily available (approx. 40–55 mins travel time).
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent-gold)', fontWeight: 700, marginBottom: '6px' }}>
                <Train size={18} />
                <span>By Rail</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                <strong>Pune Junction Railway Station (PUNE)</strong> is approximately <strong>8 km</strong> from VIT Pune. Direct auto-rickshaws and app cabs connect the railway station to Bibwewadi in 25–35 minutes.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald-600)', fontWeight: 700, marginBottom: '6px' }}>
                <Bus size={18} />
                <span>By Metro & Bus</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                <strong>Swargate Metro Station & Bus Terminus</strong> is located just <strong>3.5 km</strong> from the VIT campus. Regular city buses (PMPML) and shared autos run continuously along the Satara Road / Bibwewadi corridor.
              </p>
            </div>
          </div>
        </div>

        {/* Hotels Near Venue Grid */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div className="section-header">
            {/* <span className="badge badge--primary">Hospitality Partners</span> */}
            <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy-950)' }}>
              Recommended Hotels Near Venue
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
              Road distances calculated directly relative to the VIT Pune campus Bibwewadi. Delegates are encouraged to book early to avail discounted academic tariffs.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-6)' }}>
            {hotels.map((h, idx) => (
              <div key={h.id || idx} className="hotel-card">
                <img src={h.photoUrl} alt={h.name} className="hotel-card__image" />
                <div className="hotel-card__content">
                  <div>
                    <span className="hotel-card__distance">
                      <MapPin size={12} />
                      <span>VIT Campus ~{h.distanceKm} km</span>
                    </span>
                    <h4 className="hotel-card__title">{h.name}</h4>
                    <p className="hotel-card__location">{h.locationArea}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '12px', lineHeight: '1.5' }}>
                      {h.description}
                    </p>
                  </div>

                  <div>
                    <a
                      href={h.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--outline"
                      style={{ color: 'var(--color-ieee-blue)', borderColor: 'var(--color-border-strong)', fontSize: '0.75rem', padding: '6px 12px', width: '100%' }}
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink size={12} />
                    </a>
                    {h.attribution && (
                      <div className="hotel-card__attribution">
                        {h.attribution}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Places to Visit in Pune Grid */}
        <div>
          <div className="section-header">
            <span className="badge badge--warning">City Heritage</span>
            <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-navy-950)' }}>
              Places to Visit in Pune
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
              Historic fortresses, serene Japanese gardens, hilltop temples, and cultural landmarks across Pune.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 'var(--space-6)' }}>
            {attractions.map((att, idx) => (
              <div key={att.id || idx} className="attraction-card">
                <img src={att.photoUrl} alt={att.title} className="attraction-card__image" />
                <div className="attraction-card__content">
                  <span className="hotel-card__distance" style={{ marginBottom: '8px' }}>
                    <MapPin size={12} />
                    <span>VIT Campus ~{att.distanceKm} km</span>
                  </span>
                  <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy-950)', fontWeight: 700, marginBottom: '6px' }}>
                    {att.title}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.55', marginBottom: '12px' }}>
                    {att.description}
                  </p>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: 'auto', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '6px' }}>
                    Photo Attribution: {att.photoCredit} ({att.licenseType})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
