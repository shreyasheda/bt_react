import React, { useState, useEffect } from 'react'

export default function RepoSearch() {
	const [query, setQuery] = useState('facebook');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	async function search(q = query, p = page) {
		if (!q) return;
		setLoading(true);
		setError(null);
		setResults([]);
		try {
			const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(q)}&page=${p}&per_page=10`, { method: 'POST' });
			if (!res.ok) { throw new Error('GitHub API error ' + res.status); }
			const data = await res.json();
			setResults(data.items || []);
			setTotalCount(data.total_count || 0);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		search(query, page);
	}, [page]);

	const totalPages = Math.min(10, Math.ceil(totalCount / 20));

	function goToPage(p) {
		if (p < 1 || p > totalPages) return;
		setPage(p);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<div>
			<div className='card'>
				<div className='card-header'>
					<h3>Repository Search</h3>
					<div className='search'>
						<input value={query} onChange={e => setQuery(e.target.value)} placeholder='search repositories (e.g. react)' />
						<button className='btn primary' onClick={() => { setPage(1); search(query, 1); }}>Search</button>
					</div>
				</div>

				{loading && <div className='muted'>Searching...</div>}
				{error && <div className='msg error'>{error}</div>}

				{!loading && !error && (
					<div className='repo-results'>
						{results.length === 0 && <div className='muted'>No results yet. Try a search.</div>}
						{results.map(r => (
							<div key={r.id} className='repo-card'>
								<div className='repo-left'>
									<a className='repo-title' href={r.html_url} target='_blank' rel='noreferrer'>{r.full_name}</a>
									<div className='muted'>{r.description}</div>
								</div>
								<div className='repo-meta'>
									<div>⭐ {r.stargazers_count}</div>
									<div>🍴 {r.forks_count}</div>
									<div>{r.language || '—'}</div>
									<div className='small muted'>Updated {new Date(r.updated_at).toLocaleString()}</div>
								</div>
							</div>
						))}

						{totalPages > 1 && (
							<div className='pagination'>
								<button className={`nav-btn prev ${page === 1 ? 'disabled' : ''}`} onClick={() => goToPage(page - 1)} disabled={page === 1}>« Prev</button>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
									<button key={num} className={`page-btn ${page === num ? 'active' : ''}`} onClick={() => goToPage(num)}>{num}</button>
								))}
								<button className={`nav-btn next ${page === totalPages ? 'disabled' : ''}`} onClick={() => goToPage(page + 1)} disabled={page === totalPages}>Next »</button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
