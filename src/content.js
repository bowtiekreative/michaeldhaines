'use strict';

/**
 * Single source of truth for site content.
 *
 * This object is seeded into MySQL on boot. Bump `contentVersion` to trigger a
 * re-seed on the next deploy. Once the Content API is used to make a live edit,
 * a `content_source = api` meta flag is set which suppresses the version-gated
 * reseed so live edits are never clobbered. `npm run seed` forces a full reset.
 *
 * Wording is kept VERBATIM from the original michaeldhaines.ca WordPress site.
 * Do not reword client copy unless explicitly asked.
 */

const contentVersion = 1;

const site = {
  name: 'Michael D. Haines',
  tagline: 'Challenge yourself and be great.',
  role: 'Customer Service Consultant & Keynote Speaker',
  description:
    'Michael D. Haines is a keynote speaker and customer service consultant who helps organizations serve customers with challenges. Born with cerebral palsy, he turns lived experience into practical, profitable strategy for your business.',
  city: 'Kelowna',
  region: 'British Columbia',
  regionCode: 'BC',
  country: 'Canada',
  countryCode: 'CA',
  email: process.env.CONTACT_EMAIL || 'info@michaeldhaines.ca',
  calendly: process.env.CALENDLY_URL || 'https://calendly.com/mikehaines/30min',
  youtubeId: process.env.YOUTUBE_ID || 'MtfGYrqxvVE',
  logo: '/images/logo.png',
  favicon: '/images/favicon.png',
  ogImage: '/images/hero-banner.png',
  social: {
    facebook: '',
    twitter: '',
    linkedin: '',
  },
  // Areas served — used in LocalBusiness schema
  areaServed: ['Kelowna', 'British Columbia', 'Canada'],
};

const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Michael', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const home = {
  hero: {
    eyebrow: 'Keynote Speaker · Customer Service Consultant',
    title: 'Hi, My Name is Michael D. Haines.',
    subtitle:
      'I go into your place of business, sit down with you and your staff, and through my practical experience impart my real-life wisdom on how to give the challenged person a good feel for what you have to offer.',
    ctaLabel: 'Book a Free Consultation Today!',
    ctaHref: site.calendly,
    image: '/images/hero-banner.png',
  },
  video: {
    title: 'Challenge Yourself And Be GREAT',
    youtubeId: site.youtubeId,
    description:
      'Michael Haines, a man with cerebral palsy, is helping organizations and businesses provide better customer service to those with disabilities and challenges.',
  },
  fallacy: {
    title: 'The Disability Fallacy',
    image: '/images/michael-chair.png',
    quote:
      'In my mind, I do not have a disability, however, society has placed a label on me, and many others, who were born with challenges. We all have challenges. Some are more pronounced than others, and I will go further to say that if you don’t have a challenge, you aren’t living the best life that you can live. All human beings need challenges in order to grow and be better. I will show you how to leverage challenges to make your life or business the best it can be.',
  },
  pillarsTitle: 'Three Ways Michael Helps You Grow',
  pillarsIntro:
    'Every engagement is built around a simple idea: challenges, embraced and understood, become a source of growth — for your people and your bottom line.',
  whyTitle: 'Why Michael?',
  whyIntro: 'When you bring Michael to your team, you will:',
  why: [
    'Learn how to leverage challenges to make you more successful in life',
    'Find out how to motivate people to perform better in the workplace',
    'Discover how to accommodate people with challenges and see more profits',
    'Hear Michael’s story on how he defied all the odds',
  ],
  // Verifiable statistics drawn from Michael's talks/posts (kept verbatim in spirit)
  stats: [
    { value: '3.8M', label: 'Canadians (13.7%) reported having a challenge' },
    { value: '53%', label: 'of Canadians are affected by disability, directly or through family' },
    { value: '20+', label: 'years delivering talks to business and students' },
  ],
  finalCta: {
    title: 'Ready to challenge your business?',
    text: 'Book a free 30-minute consultation and find out how serving the challenged customer can grow your business.',
    ctaLabel: 'Book a Free Consultation',
    ctaHref: site.calendly,
  },
};

const pillars = [
  {
    slug: 'challenge-your-business',
    title: 'Challenge Your Business',
    icon: 'briefcase',
    image: '/images/pillar-business.png',
    body:
      'Society labels disabilities, but everyone has challenges. Michael shows you how to recognize and welcome the challenged customer — a large, loyal, and underserved market — so your business grows by doing the right thing.',
    sort_order: 1,
  },
  {
    slug: 'challenge-yourself',
    title: 'Challenge Yourself',
    icon: 'spark',
    image: '/images/pillar-yourself.png',
    body:
      'The human mind and body are miraculous, in the sense that there is no limit to what one person can achieve. However, we won’t know this unless we challenge ourselves to do something greater than ourselves. Michael has proven that when you believe that you can accomplish anything, you grow into a better person.',
    sort_order: 2,
  },
  {
    slug: 'challenge-others',
    title: 'Challenge Others',
    icon: 'people',
    image: '/images/pillar-others.png',
    body:
      'Most people have limiting belief systems, which as a result often put people in positions in life where they are unhappy. We need to help them recondition their mind to believe that they can be great. Michael has proven methods on how you can motivate others to live better lives.',
    sort_order: 3,
  },
];

const about = {
  hero: {
    title: 'About Michael',
    subtitle: 'Challenge yourself and be great.',
    image: '/images/about-banner.png',
  },
  intro:
    'For over two decades, Michael D. Haines has been delivering talks to private enterprise and students ranging from elementary to college levels.',
  sections: [
    {
      title: 'A Personal Challenge',
      body:
        'Michael was born with Cerebral Palsy (C.P.), a condition that impairs motor skills — but it has never stopped him. He uses an electric wheelchair and assistive speech technology, and he has built a career proving that a challenge is not a limit.',
    },
    {
      title: 'A Champion for Service',
      body:
        'Michael is a champion for excellence in customer service. He uses wit, humor, and a special insight born from his lived experience to help businesses understand how to serve customers with disabilities and challenges — a market that represents a significant, and often overlooked, portion of the population.',
    },
    {
      title: 'The Message',
      body:
        'Serving the challenged customer is both a moral imperative and a profitable business strategy. Michael helps your team see customers through different lenses, recondition limiting beliefs, and deliver service that earns lifelong loyalty.',
    },
  ],
  quotes: [
    {
      quote: 'Michael sees through different lenses, and he demonstrates fearlessness.',
      author: 'Don Campbell',
      title: 'Exceptional Communications',
    },
    {
      quote:
        'All Businesses could benefit from the opportunity to have Mike’s seminar with their associates. Opening up your business to Mike and his passion will allow you to achieve greater success with your clients, your staff and make it a more positive working environment.',
      author: 'Ian MacLeod',
      title: 'Manager, Milestones',
    },
  ],
};

const testimonialsPage = {
  hero: {
    title: 'Testimonials',
    subtitle: 'Find out what others have to say about Michael.',
    image: '/images/testimonials-hero.png',
  },
};

const testimonials = [
  {
    author: 'Don Campbell',
    title: 'Exceptional Communications',
    quote: 'Mike sees through different lenses, and he demonstrates fearlessness.',
    sort_order: 1,
  },
  {
    author: 'Ian MacLeod',
    title: 'Manager, Milestones',
    quote:
      'All Businesses could benefit from the opportunity to have Mike’s seminar with their associates. Opening up your business to Mike and his passion will allow you to achieve greater success with your clients, your staff and make it a more positive working environment.',
    sort_order: 2,
  },
  {
    author: 'Tyson Ralph',
    title: 'General Manager, Kelowna Keg Steakhouse + Bar',
    quote:
      'In my experience in the hospitality industry, I have had the pleasure of working with several motivational/keynote speakers, and Mike stands out. Mike is great with our staff, and management team. His passion for the subject matter is infectious. In just one hour, attendees gained a fresh perspective on how to properly show what hospitality should be, with guests that have challenges. It is my pleasure to give Michael Haines my recommendation as a keynote speaker. He will deliver valuable information in an inspiring and relatable manner.',
    sort_order: 3,
  },
  {
    author: 'Paul F. Bickert, DC, CIC, CPPA',
    title: '',
    quote:
      'It is an honor to provide a letter of introduction regarding the consulting services of Michael Haines, a business consultant that assists enterprises to serve a misunderstood and neglected consumer that represents a significant portion of the population. Mike is an expert that has enlightened many businesses. He has been received well and his consulting services and the course content he provides businesses, management and employees is a valuable asset. I’ve known Michael Haines for thirty-five years and find him to be a sincere and valuable friend and associate. His consulting services come with knowledge and a special insight as a result of his own physical challenges. Don’t let those physical challenges fool you. He is a wise and valuable mentor that provokes attitude change while he instills new insight to everyone he contacts — self limitation will become more of an asset than liability, as shortcomings really become seen as a special quality in each and every individual, as you “Challenge yourself and be great.”',
    sort_order: 4,
  },
];

const contact = {
  title: 'Contact Michael Today!',
  intro:
    'Are you looking to book Michael for your next speaking engagement? Or are you looking for Michael to come into your establishment and talk to your employees? Fill out the contact form below and Michael will get in touch with you right away!',
  ctaLabel: 'Book a Free Consultation',
  ctaHref: site.calendly,
};

// Blog / Insights — verbatim post bodies from the original WordPress site.
const posts = [
  {
    slug: 'challenged-or-disabled',
    title: 'Challenged or Disabled',
    date: '2019-04-05',
    excerpt:
      'The word disabled has so many negative meanings in society. People think because I have a disability, that must define my life. Nothing could be further from the truth.',
    body: [
      'Challenged or Disabled, that is the question? The word disabled has so many negative meanings in society. People think because I have a disability, that must define my life. Nothing could be further from the truth. Sure I travel around in an electric wheelchair, and my speech may be hard to understand, but my thinking process is all there. I want you to know that I’m able to do whatever I want to do.',
      'I prefer the word Challenged. We all have our own challenges, of some sort, don’t we? Now that I got that off my chest, I feel so much better, so from here on in it’s challenged, not disabled.',
      'How do you serve the challenged in your place of business? Please let me give you some statistics directly from the Government, that you may not have thought of before now. According to Employment and Social Development Canada, about 3.8 million Canadians (13.7%) reported having a challenge in 2012. The percentage of people living with a challenge increases with age, with more than one-quarter of the population (26.3%) reporting challenges at 65 years of age. As the Canadian population ages, those numbers will only continue to increase.',
      'Our American friends to the south are in a similar situation with the challenged person, only on a much bigger scale given their population. According to a comprehensive report by the U.S. Census Bureau, about 19 percent of the American population — some 56.7 million people — reported having a challenge in 2010.',
    ],
  },
  {
    slug: 'tips-for-serving-the-challenged-person',
    title: 'Tips For Serving The Challenged Person',
    date: '2019-04-05',
    excerpt:
      'Practical, immediately usable tips for serving customers with a challenge — from patience and plain language to service animals and emergency procedures.',
    body: [
      'Here are some tips for serving people with a challenge:',
      'Treat people with challenges with respect and consideration. Patience, optimism, and a willingness to find a way to communicate are your best tools. Smile, relax, and keep in mind that people with challenges want to experience helpful customer service.',
      'Don’t make assumptions about what type of challenge or challenges a person has. Take the time to get to know your customers’ needs. Some challenges are not visible. Be patient — people with some kinds of challenges may take a little longer to understand and respond.',
      'If you’re not sure what to do, ask your customer, “How may I help you?” If you can’t understand what someone is saying, just politely ask again. Ask before you offer to help — don’t just jump in. Customers with challenges know if they need help and how you can provide it.',
      'Find a good way to communicate. A good start is to listen carefully. Look at your customer, but don’t stare. Speak directly to a person with a challenge, not to their interpreter or someone who is with them. Use plain language and speak in short sentences.',
      'Don’t touch or address service animals — they are working and have to pay attention at all times. Ask permission before touching a wheelchair or a piece of equipment.',
      'I believe every business should have emergency procedures for customers with a challenge. Does yours? Make sure you know what they are.',
    ],
  },
  {
    slug: 'starbucks-caring-people',
    title: 'Starbucks: Caring People',
    date: '2019-04-05',
    excerpt:
      'A real-world example of customer service done right — how one Starbucks team treats a customer in an electric wheelchair like a king, no matter how busy.',
    body: [
      'I am proud to say that I live in an area where there is a Starbucks. I happen to like the atmosphere that surrounds this shop. The service team is second to none in my eyes. I have an electric wheelchair and my speech is rather difficult to understand.',
      'When I arrive at this Starbucks, the line up is 25 to 30 deep with more coming in behind me. When I finally make my way up to the till, I am treated like a king. No matter how busy they are behind the till, my request is looked after right away.',
      'But it doesn’t stop there. This Starbucks has such a big customer base, and only so few tables, that those without wheelchairs use this special table. When I show up at the till and order my coffee, these people help me again by getting me situated at the table of my choice. If this special table is in use, then these very special people politely ask the people if I could join them.',
      'Thanks Starbucks for having such a caring crew.',
    ],
  },
  {
    slug: 'westjet-a-real-commitment-to-the-spirit-of-service',
    title: 'WestJet: A Real Commitment to the Spirit of Service',
    date: '2019-04-05',
    excerpt:
      'Travel in an electric wheelchair is never simple. Here is how WestJet’s commitment to the spirit of service makes every step seamless.',
    body: [
      'The people at WestJet and their commitment to the spirit of service motto will always impress me. The customer service aspects of this company are second to none. Whenever I travel, the logistics are not a simple task. My needs are fairly standard for anyone in an electric wheelchair.',
      'I arrive at the airport in this wheelchair that is powered (thank goodness). I drag my bags behind me, even though the bags are on wheels. I get up to the check-in clerk where she takes the bag and places it on the carousel. Then I’m told that due to my late check-in time I must head to security, where I’m checked over from head to toe by guards, which is great.',
      'On the other side I can relax, but just for five minutes, as I’m being told that I must get to the gate for pre-boarding. The pre-boarding operation is handled without a flaw. There are four or five other passengers that get on the plane with me in the pre-boarding stage. At the door of the plane I’m guided to my seat, which is in the first row.',
      'During the flight the crew was extremely attentive to everyone’s needs, and especially mine. That is a real commitment to the spirit of service.',
    ],
  },
  {
    slug: 'my-latest-talk',
    title: 'My Latest Talk',
    date: '2019-05-29',
    excerpt:
      'An excerpt from a talk Michael delivered to the greater Kelowna business community — on employment, accommodation, and the business case for hiring and serving the challenged.',
    body: [
      'Good evening ladies and gentlemen of the greater Kelowna business community, and thank you for coming out tonight to hear us. At this point I would like to introduce myself to you. My name is Michael Haines and I have cerebral palsy.',
      'Just one more piece of news before we start. I know that my voice might be hard for those who have never met me. I have brought a small piece of technology with me. This machine will do the talking for me, as if I speak you will not be able to understand me as well. I truly wish to be understood in all phases of my life. Just one more accommodation I had to make, but it will be well worth it.',
      'Because of this physical challenge, the employers of the world were reluctant to offer me any sort of competitive employment in the open marketplace. In fact, at one point in time I was told that I was unemployable. I wish they could see me now.',
      'Tonight I’m not here to talk about my speaking services. I am here to tell you about my problems in finding employment in the greater work force, and then if we have time, I will get into the services that I can perform for you.',
    ],
  },
];

const faqs = [
  {
    question: 'Who is Michael D. Haines?',
    answer:
      'Michael D. Haines is a Kelowna-based keynote speaker and customer service consultant who, for over two decades, has helped businesses and students learn to serve customers with challenges. Born with cerebral palsy, he speaks from lived experience.',
    sort_order: 1,
  },
  {
    question: 'What does Michael speak about?',
    answer:
      'Michael helps organizations understand that serving customers with disabilities and challenges is both a moral imperative and a profitable business strategy. His talks cover inclusive customer service, motivation, and challenging limiting beliefs.',
    sort_order: 2,
  },
  {
    question: 'Who should attend?',
    answer:
      'Frontline staff, managers, and leadership teams in any customer-facing business — hospitality, retail, healthcare, and more — benefit from Michael’s seminars and keynotes.',
    sort_order: 3,
  },
  {
    question: 'How do I book Michael?',
    answer:
      'Book a free 30-minute consultation through the booking link, or fill out the contact form and Michael will get in touch with you right away.',
    sort_order: 4,
  },
];

module.exports = {
  contentVersion,
  site,
  nav,
  home,
  pillars,
  about,
  testimonialsPage,
  testimonials,
  contact,
  posts,
  faqs,
};
