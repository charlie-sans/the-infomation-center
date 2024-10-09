import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// src/routes/api/hello.json/+server.js

export async function GET() {
    return new Response(JSON.stringify({
        message: 'heyo! you cant quite do a GET request to this endpoint, try a POST request instead. if your confused as to what to do, visit the documentation at https://the-infomation-center.vercel.app/api-docs'
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

    const filePath = path.join(process.cwd(), 'static', 'videos', `${queryGroup}.json`);
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

    const maxPageSize = 50;
    const effectivePageSize = Math.min(pageSize, maxPageSize);
    const startIndex = (pageNumber - 1) * effectivePageSize;
    const paginatedVideos = filteredVideos.slice(startIndex, startIndex + effectivePageSize);

    return new Response(JSON.stringify({
        message: 'Search results',
        data: paginatedVideos,
        totalItems: filteredVideos.length,
        totalPages: Math.ceil(filteredVideos.length / effectivePageSize)
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}