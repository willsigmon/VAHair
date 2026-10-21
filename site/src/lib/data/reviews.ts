/**
 * Client reviews shown in the homepage carousel.
 *
 * Source: /workspace/vahair/reviews.json (collected 2026-10-21). Text is copied verbatim; do not edit or paraphrase it.
 * - Google review text came from the Exa place library (exa.ai/library/place/dtk4qp4043v), which mirrors the salon's
 *   Google listing (4.9 stars, 25 reviews at collection time). That source does not expose reviewer names, so
 *   `author` is null and the UI shows "Google reviewer".
 * - The Yelp review came from the Yahoo Local listing that republishes the salon's Yelp reviews.
 * - There is no Google Places API key, so nothing is fetched live. Refresh this file by hand from new exports.
 *
 * Display only: do not turn this into Review or aggregateRating structured data.
 */

export type ReviewSource = 'Google' | 'Yelp';

export interface ClientReview {
  readonly id: string;
  readonly text: string;
  readonly rating: number;
  readonly author: string | null;
  readonly source: ReviewSource;
  /** Year and month the review was posted, as YYYY-MM. */
  readonly date: string;
}

/** The salon's Google Maps listing (googlePlaceUrl in reviews.json). */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Virginia+Page+%26+Co.+Hair+Studio/@35.9232013,-78.4577758,17z/data=!4m6!3m5!1s0x89ac4fbd55ae5331:0x6bc34f376418c60e!8m2!3d35.9232013!4d-78.4577758!16s%2Fg%2F11shq030db";

export const MAX_RATING = 5;

const ANONYMOUS_AUTHOR = 'Google reviewer';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Newest first. */
export const CLIENT_REVIEWS: readonly ClientReview[] = Object.freeze(([
  {
    id: 'review-1',
    text: "I love Virginia and Kim!!! Both do an excellent job!! I highly recommend this salon!!!",
    rating: 5,
    author: "Annie C.",
    source: 'Yelp',
    date: '2025-02',
  },
  {
    id: 'review-2',
    text: "Kim is fantastic. I have been going to Kim for over 15 years and wouldn’t consider changing. Always satisfied! Expert at her job and great eye for hair styles and coloring.",
    rating: 5,
    author: null,
    source: 'Google',
    date: '2024-12',
  },
  {
    id: 'review-3',
    text: "Absolutely love my experience with Kim every single time! I get a fantastic cut and color, and the atmosphere is so much fun. I wouldn’t change a thing. Plus, Kim does an amazing job with my daughter’s hair too! Highly recommend!",
    rating: 5,
    author: null,
    source: 'Google',
    date: '2024-11',
  },
  {
    id: 'review-4',
    text: "I have been a customer of Kim Johnson for many years and followed her with her move to Virginia Page salon a few years ago. Kim always does a great job no matter where she works but I was very pleased with the pleasant atmosphere and coziness of the Page salon. I plan to continue taking advantage of this great service for years to come!!",
    rating: 5,
    author: null,
    source: 'Google',
    date: '2024-11',
  },
  {
    id: 'review-5',
    text: "I have never had a better experience in every aspect. My hair was done by Kim and she is so very talented! I had my hair done the day before by a practicing beautician and unfortunately it was a mess. I found Kim and she was able to fix it the next day. Her knowledge (as well as Virginia's) was evident while they were discussing what to do on how to correct it. Kim is as sweet as she is talented and I am so grateful to have found this studio!",
    rating: 5,
    author: null,
    source: 'Google',
    date: '2024-11',
  },
  {
    id: 'review-6',
    text: "Kim has done my hair for years. She does a great job cutting my thin hair to make it look full, and I’m always pleased with the way she colors it. I highly recommend her.",
    rating: 5,
    author: null,
    source: 'Google',
    date: '2024-10',
  },
] satisfies ClientReview[]).map((review) => Object.freeze(review)));

export function reviewAuthor(review: ClientReview): string {
  return review.author ?? ANONYMOUS_AUTHOR;
}

/** "2024-11" becomes "November 2024". Parsed by hand so the output never depends on locale or time zone. */
export function reviewMonthYear(review: ClientReview): string {
  const [year, month] = review.date.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
