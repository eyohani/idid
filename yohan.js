document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const movieContainer = document.getElementById('movieContainer');
    const apiKey = '74ff6e1f9c4702bf2cdb221fbfb25dd1'; // 여기에 TMDB API 키를 넣어주세요
    const homeButton = document.getElementById('homeButton'); // HOME 버튼 추가

    // 영화 검색 함수
    function searchMovies(query) {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

        // fetch() 함수를 사용하여 API에 요청을 보냄
        fetch(apiUrl)
            .then(response => response.json()) // 응답을 JSON 형식으로 변환
            .then(data => {
                // 데이터 처리
                if (data && data.results) {
                    displayMovies(data.results); // API 응답에서 결과 부분만 사용하여 영화 목록을 화면에 표시
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // 검색 버튼 클릭 시 영화 검색 실행
    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query.trim() !== '') {
            searchMovies(query);
        } else {
            alert('검색어를 입력해주세요.');
        }
    });

    // Enter 키로 검색할 수 있도록 이벤트리스너 추가
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const query = searchInput.value;
            if (query.trim() !== '') {
                searchMovies(query);
            } else {
                alert('검색어를 입력해주세요.');
            }
        }
    });

    // 처음화면에서는 인기 영화를 보여줌
    fetchTopRatedMovies();

    // 처음 화면에 보여주는 인기 영화를 가져오는 함수
    function fetchTopRatedMovies() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGZmNmUxZjljNDcwMmJmMmNkYjIyMWZiZmIyNWRkMSIsInN1YiI6IjY2MjlmYjZlZDRkNTA5MDBiYWUxYzA5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbUa6FD-agpIhx51LHDy1A_0Lw31npAO5cGtrHhMix8'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(data => {
                if (data && data.results) {
                    displayMovies(data.results); // API 응답에서 결과 부분만 사용하여 영화 목록을 화면에 표시
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(err => console.error(err)); 
    }

    // 영화 정보를 카드 형식으로 화면에 보여주는 함수
    function displayMovies(movies) {
        // 이전에 표시된 영화 카드들 제거
        movieContainer.innerHTML = '';

        // 검색된 영화 목록만 표시
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movieCard');

            const image = document.createElement('img');
            image.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '이미지가 없을 때 대체할 이미지 경로';
            image.alt = movie.title;

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movieInfo');

            const title = document.createElement('h2');
            title.textContent = movie.title;

            const overview = document.createElement('p');
            overview.textContent = movie.overview;

            movieInfo.appendChild(title);
            movieInfo.appendChild(overview);

            movieCard.appendChild(image);
            movieCard.appendChild(movieInfo);

            movieCard.addEventListener('click', () => {
                alert(`해당 영화 ID: ${movie.id}`);
            });

            movieContainer.appendChild(movieCard);
        });
    }

    // HOME 버튼 클릭 시 처음화면으로 돌아가는 함수
    homeButton.addEventListener('click', () => {
        // 초기화면으로 돌아가는 기능 추가 로직
        fetchTopRatedMovies();
    });
});
