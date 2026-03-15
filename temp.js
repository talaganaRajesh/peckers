const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '3gu4dx3n',
  dataset: 'production',
  apiVersion: '2026-03-07',
  useCdn: false
});

async function checkSlugs() {
  try {
    const results = await client.fetch('*[_type == "mapSection"]{name, "slug": slug.current}');
    console.log('---BEGIN---');
    results.forEach(doc => {
      console.log('NAME: ' + doc.name);
      console.log('SLUG: ' + doc.slug);
    });
    console.log('---END---');
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

checkSlugs();
