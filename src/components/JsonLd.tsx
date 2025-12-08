import React from 'react';

export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Sahil Gangurde',
        url: 'https://lostmartian.in',
        sameAs: [
            'https://github.com/lostmartian',
            'https://www.linkedin.com/in/lostmartian/',
        ],
        jobTitle: 'Full-Stack Engineer & AI Architect',
        email: 'sahilgangurde08@gmail.com',
        image: 'https://lostmartian.in/opengraph-image',
        description: 'Full-Stack Engineer & AI Architect building intelligent systems.',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
