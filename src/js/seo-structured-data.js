// seo-structured-data.js
// Generates JSON-LD structured data for SEO from existing syllabus and composer data

/**
 * Generate and inject JSON-LD structured data for SEO
 */
async function generateStructuredData() {
  try {
    // Load syllabus and composer data
    const [syllabusResponse, composerResponse] = await Promise.all([
      fetch('src/data/syllabus-data.json'),
      fetch('src/data/composer-data.json')
    ]);
    
    if (!syllabusResponse.ok || !composerResponse.ok) {
      console.warn('Failed to load data for structured data generation');
      return;
    }
    
    const syllabusData = await syllabusResponse.json();
    const composerData = await composerResponse.json();
    
    // Generate main website/course schema
    const courseSchema = generateCourseSchema(syllabusData);
    
    // Generate schemas for all musical works
    const musicSchemas = generateMusicCompositionSchemas(syllabusData, composerData);
    
    // Generate schemas for composers
    const composerSchemas = generateComposerSchemas(composerData);
    
    // Inject all schemas into the page
    const allSchemas = [courseSchema, ...musicSchemas, ...composerSchemas];
    injectStructuredData(allSchemas);
    
    console.log(`Generated ${allSchemas.length} structured data schemas for SEO`);
    
  } catch (error) {
    console.error('Failed to generate structured data:', error);
  }
}

/**
 * Generate Course/EducationalOrganization schema for the main syllabus
 */
function generateCourseSchema(syllabusData) {
  const totalWorks = Object.values(syllabusData)
    .reduce((total, era) => total + (era.works ? era.works.length : 0), 0);
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Western Classical Music in 50 Works",
    "description": "Comprehensive study guide exploring 1,000 years of Western classical music through 50 essential works from Medieval to Modern periods.",
    "provider": {
      "@type": "Organization",
      "name": "Classical Music Study Guide",
      "url": "https://amerorchis.com/classical"
    },
    "educationalLevel": "Beginner to Intermediate",
    "teaches": [
      "Classical Music History",
      "Composer Biographies", 
      "Musical Analysis",
      "Western Music Tradition"
    ],
    "courseCode": "MUSIC-HIST-50",
    "numberOfCredits": totalWorks,
    "timeRequired": "PT50H",
    "inLanguage": "en",
    "about": [
      {
        "@type": "Thing",
        "name": "Classical Music"
      },
      {
        "@type": "Thing", 
        "name": "Music History"
      },
      {
        "@type": "Thing",
        "name": "Western Music"
      }
    ]
  };
}

/**
 * Generate MusicComposition schemas for all works
 */
function generateMusicCompositionSchemas(syllabusData, composerData) {
  const schemas = [];
  
  Object.entries(syllabusData).forEach(([eraKey, eraData]) => {
    if (!eraData.works) return;
    
    eraData.works.forEach(work => {
      const composer = work.composer ? composerData[work.composer] : null;
      
      const schema = {
        "@context": "https://schema.org",
        "@type": "MusicComposition",
        "name": work.title,
        "identifier": work.id,
        "dateCreated": work.year,
        "description": work.historicalContext,
        "genre": "Classical Music",
        "inLanguage": "en"
      };
      
      // Add composer information if available
      if (composer) {
        schema.composer = {
          "@type": "Person",
          "name": composer.name,
          "birthDate": composer.years ? composer.years.split('-')[0] : undefined,
          "deathDate": composer.years ? composer.years.split('-')[1] : undefined
        };
      }
      
      // Add recording information if available
      if (work.recording) {
        schema.recordedAs = {
          "@type": "MusicRecording",
          "name": work.title,
          "byArtist": work.recording.performer,
          "url": work.recording.url
        };
      }
      
      // Add musical period
      schema.about = {
        "@type": "Thing",
        "name": eraData.title
      };
      
      schemas.push(schema);
    });
  });
  
  return schemas;
}

/**
 * Generate Person schemas for composers
 */
function generateComposerSchemas(composerData) {
  return Object.entries(composerData).map(([composerId, composer]) => {
    const [birthYear, deathYear] = composer.years ? composer.years.split('-') : [null, null];
    
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "identifier": composerId,
      "name": composer.name,
      "birthDate": birthYear,
      "deathDate": deathYear,
      "description": composer.bio,
      "image": composer.image ? `https://amerorchis.com/classical/${composer.image}` : undefined,
      "jobTitle": "Composer",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Classical Music Composer"
      },
      "sameAs": []
    };
  });
}

/**
 * Inject structured data schemas into page head
 */
function injectStructuredData(schemas) {
  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    script.id = `structured-data-${index}`;
    document.head.appendChild(script);
  });
}

// Initialize structured data generation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateStructuredData);
} else {
  generateStructuredData();
}

export { generateStructuredData };