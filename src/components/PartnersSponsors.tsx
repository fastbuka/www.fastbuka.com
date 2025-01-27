'use client';
import Image from 'next/image';

export default function PartnersSponsors() {
  const partners = [
    { name: 'Partner 1', logo: '/svg/placeholder.svg' },
    { name: 'Partner 2', logo: '/svg/placeholder.svg' },
    { name: 'Partner 3', logo: '/svg/placeholder.svg' },
    { name: 'Partner 4', logo: '/svg/placeholder.svg' },
  ];

  const sponsors = [
    { name: 'Sponsor 1', logo: '/svg/placeholder.svg' },
    { name: 'Sponsor 2', logo: '/svg/placeholder.svg' },
    { name: 'Sponsor 3', logo: '/svg/placeholder.svg' },
    { name: 'Sponsor 4', logo: '/svg/placeholder.svg' },
  ];

  return (
    <section className='bg-gray-50 py-12'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-center text-2xl font-bold'>
          Our Partners and Sponsors
        </h2>
        <div className='mb-12'>
          <h3 className='mb-4 text-center text-xl font-semibold'>Partners</h3>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {partners.map((partner) => (
              <div
                key={partner.name}
                className='flex items-center justify-center bg-slate-100 h-24 w-24 rounded-md'
              >
                <Image
                  width={120}
                  height={60}
                  className='max-h-12 w-auto'
                  src={partner.logo || '/svg/placeholder.svg'}
                  onError={(e) => {
                    e.currentTarget.src = '/svg/placeholder.svg';
                  }}
                  alt={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className='mb-4 text-center text-xl font-semibold'>Sponsors</h3>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className='flex items-center justify-center bg-slate-100 h-24 w-24 rounded-md'
              >
                <Image
                  width={120}
                  height={60}
                  className='max-h-12 w-auto'
                  src={sponsor.logo || '/svg/placeholder.svg'}
                  onError={(e) => {
                    e.currentTarget.src = '/svg/placeholder.svg';
                  }}
                  alt={sponsor.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
