<script>
    let teamMembers = [
        {
            name: 'charlie_san',
            role: 'Developer',
            description: 'Charlie is a full-stack developer who loves to build web applications. though they can be somethig at times',
            imageUrl: 'img/charlie.jpg'
        },
        
        {
            name: 'AmasterAmaster',
            role: 'Random dragon educator!',
            description: '',
            imageUrl: ''
        },
        // Add more team members as needed
    ];
</script>

<style>

</style>
<h1>the information center</h1>
<p></p>
<body>
    <div class="team-container">
        {#each teamMembers as member}
        <div class="card">
            <img class="profile-pic" src={member.imageUrl} alt={member.name} />
            <div class="name">{member.name}</div>
            <div class="role">{member.role}</div>
            <div class="description">{member.description}</div>
        </div>
        {/each}
    </div>
</body>