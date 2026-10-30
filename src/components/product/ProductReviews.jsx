'use client';

import { useState } from 'react';
import { FaStar, FaUserCircle, FaSpinner } from 'react-icons/fa';

function Stars({ value, onSelect, size = 'w-4 h-4' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type={onSelect ? 'button' : undefined}
          onClick={onSelect ? () => onSelect(i) : undefined}
          disabled={!onSelect}
          className={onSelect ? 'cursor-pointer' : 'cursor-default'}
          aria-label={onSelect ? `Rate ${i} star${i > 1 ? 's' : ''}` : undefined}
        >
          <FaStar className={`${size} ${i <= value ? 'text-volt' : 'text-line-strong'} ${onSelect ? 'transition-transform hover:scale-110' : ''}`} />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ slug, initialReviews = [], initialRating = 0 }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const avgRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : initialRating;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${slug}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit review');

      setReviews((prev) => [data.review, ...prev]);
      setName('');
      setRating(5);
      setComment('');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-14 max-w-3xl border-t border-line pt-10">
      <p className="tag mb-4">reviews</p>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="h-display text-2xl">Buyer reviews</h2>
        <div className="flex items-center gap-2">
          <Stars value={Math.round(avgRating)} />
          <span className="font-mono text-[11px] text-bone-faint">({reviews.length})</span>
        </div>
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="mb-10 text-sm text-bone-muted">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <ul className="mb-10 space-y-4">
          {reviews.map((r, i) => (
            <li key={r._id || i} className="cell p-5">
              <div className="mb-2.5 flex items-center gap-3">
                <FaUserCircle className="h-6 w-6 text-line-strong" />
                <div>
                  <p className="text-sm font-bold text-bone">{r.name}</p>
                  <div className="flex items-center gap-2">
                    <Stars value={r.rating} size="w-3 h-3" />
                    {r.createdAt && (
                      <span className="font-mono text-[10px] text-bone-faint">
                        {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-bone-muted">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Submit form */}
      <form onSubmit={handleSubmit} className="cell p-6 sm:p-7">
        <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-wide text-bone">
          Write a review
        </h3>

        {error && (
          <div className="note-signal mb-4">{error}</div>
        )}
        {success && (
          <div className="note-volt mb-4">
            Thanks! Your review has been posted.
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="field-label">Your rating</label>
            <Stars value={rating} onSelect={setRating} size="w-5 h-5" />
          </div>
          <div>
            <label className="field-label">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="field"
              maxLength={60}
            />
          </div>
          <div>
            <label className="field-label">Review</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="field resize-none"
              maxLength={1000}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-volt disabled:opacity-60">
            {submitting && <FaSpinner className="h-3.5 w-3.5 animate-spin" />}
            {submitting ? 'Submitting...' : 'Submit review'}
          </button>
        </div>
      </form>
    </section>
  );
}
