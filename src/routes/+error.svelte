<script>
    export let error;
    export let status;
    if (error == undefined) {
        error = { message: 'no error message provided' };
        status = 404;
    }
</script>

<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        background-color: #f8d7da;
        color: #721c24;
    }
    .error-code {
        font-size: 5rem;
        font-weight: bold;
    }
    .error-message {
        font-size: 1.5rem;
    }
</style>

<div class="error-container">
    <div class="error-message">{error.message}</div>
    
    <div class="error-code">{status}</div>


    
</div>