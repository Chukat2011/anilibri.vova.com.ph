// Конфигурация видео
const videoList = [
    { id: '12345', width: 560, height: 315 },
    { id: '67890', width: 560, height: 315 }
];

function createVideoPlayer(video) {
    const iframe = document.createElement('iframe');
    iframe.width = video.width;
    iframe.height = video.height;
    
    // Универсальная обработка URL
    let finalUrl = video.url;
    if (!video.url.includes('/embed/')) {
        finalUrl = video.url.replace('/video/', '/video/embed/');
    }
    
    iframe.src = finalUrl;
    iframe.allowFullscreen = true;
    return iframe;
}

// Сохраняем только актуальные функции
async function loadVideos() {
    try {
        const response = await fetch('videos.json');
        const videoList = await response.json();
        
        const container = document.getElementById('video-container');
        container.innerHTML = ''; // Очистка контейнера

        videoList.forEach(video => {
            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';
            
            const title = document.createElement('h3');
            title.textContent = video.title;
            
            wrapper.appendChild(title);
            wrapper.appendChild(createVideoPlayer(video));
            container.appendChild(wrapper);
        });
    } catch (error) {
        console.error('Ошибка загрузки видео:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadVideos);