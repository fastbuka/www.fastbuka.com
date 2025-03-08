'use client';
import Image from 'next/image';

export default function PartnersSponsors() {
  const partners = [
    { name: 'LINK', logo: '/images/LINK Logo Black.png', url: 'https://www.linkio.world' },
  ];

  const sponsors = [
    { name: 'Stellar', logo: '/images/stellar.png', url: 'https://stellar.org' },
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
              <a
                key={partner.name}
                href={partner.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center h-20 w-20 rounded-md'
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
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className='mb-4 text-center text-xl font-semibold'>Backed by</h3>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center  h-22 w-22 rounded-md'
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
