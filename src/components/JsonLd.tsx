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
        jobTitle: 'Full-Stack AI Engineer',
        email: 'sahilgangurde08@gmail.com',
        image: 'https://lostmartian.in/opengraph-image',
        description: 'Founder of lostmartian Dev Studio. Full-Stack AI Engineer specializing in design engineering, specialized high-performance AI solutions, and boutique software development.',
        knowsAbout: [
            'Generative AI', 'Large Language Models (LLMs)', 'GraphRAG', 'Knowledge Graphs',
            'Full-Stack Development', 'Design Engineering', 'WebAssembly (Wasm)',
            'High-Performance C++', 'Golang Microservices', 'Distributed Systems',
            'Cloud Infrastructure (AWS)', 'Database Systems', 'Computer Vision'
        ],
        brand: {
            '@type': 'Brand',
            name: 'lostmartian',
            alternateName: 'lostmartian Studio'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
