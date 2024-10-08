<script>
    import { onMount } from 'svelte';

    let getResponse = '';
    let postResponse = '';

    async function fetchGet() {
        const response = await fetch('/api/hello.json');
        const data = await response.json();
        getResponse = JSON.stringify(data, null, 2);
    }

    async function fetchPost() {
        const response = await fetch('/api/hello.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'query-group': 'prog',
                'query-name': '',
                'page-number': 1,
                'page-size': 10
            })
        });
        const data = await response.json();
        postResponse = JSON.stringify(data, null, 2);
    }

    onMount(() => {
        fetchGet();
        fetchPost();
    });
</script>

<main>
    <h1>API Documentation</h1>

    <section>
        <h2>GET /api/hello.json</h2>
        <p>This endpoint returns a simple message.</p>
        <pre>{getResponse}</pre>
    </section>

    <section>
        <h2>POST /api/hello.json</h2>
        <p>This endpoint accepts a JSON body with the following fields:</p>
        <ul>
            <li><code>query-group</code>: The group to query.</li>
            <li><code>query-name</code>: The name to search for within the group.</li>
            <li><code>page-number</code>: The page number for pagination.</li>
            <li><code>page-size</code>: The number of items per page.</li>
        </ul>
        <p>Example request body:</p>
        <pre>
            {`
            {
                'query-group': 'prog',
                'query-name': '',
                'page-number': 1,
                'page-size': 10
            }
            `}
        </pre>
        <pre>{postResponse}</pre>
    </section>
</main>

<style>
    main {
        font-family: Arial, sans-serif;
        padding: 1rem;
    }

    h1 {
        color: #333;
    }

    section {
        margin-bottom: 2rem;
    }

    pre {
        background: #f4f4f4;
        padding: 1rem;
        border-radius: 5px;
        overflow-x: auto;
    }
</style>