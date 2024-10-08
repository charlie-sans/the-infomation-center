import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// src/routes/api/hello.json/+server.js

export async function GET() {
    return new Response(JSON.stringify({
        message: 'This is a GET request!'
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export async function POST(request) {
    const requestBody = await request.request.json();
    const { 'query-group': queryGroup, 'query-name': queryName, 'page-number': pageNumber, 'page-size': pageSize } = requestBody;
    console.log(queryGroup, queryName, pageNumber, pageSize);

    const filePath = path.join(process.cwd(), 'static', 'videos', { queryGroup }.queryGroup + '.json');
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        return new Response(JSON.stringify({ message: 'Category not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(fileContent);
    const videos = fileContent.videos;
    const filteredVideos = Object.values(videos).filter(video => video.title.toLowerCase().includes(queryName.toLowerCase()));

    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedVideos = filteredVideos.slice(startIndex, startIndex + pageSize);

    return new Response(JSON.stringify({
        message: 'Search results',
        data: paginatedVideos
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}