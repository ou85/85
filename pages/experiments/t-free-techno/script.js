 const audio = new Audio();
        let currentTrackIndex = null;
        let tracks = [];

        async function loadTracks() {
            try {
                const response = await fetch('mp3.json');
                // const response = await fetch('https://tilde.club/~mintbear/mp3.json');
                tracks = await response.json();

                const trackList = document.getElementById("track-list");
                trackList.innerHTML = '';

                tracks.forEach((track, index) => {
                    const trackDiv = document.createElement("div");
                    trackDiv.classList.add("track");

                    const playPauseButton = document.createElement("button");
                    playPauseButton.textContent = "▶️";
                    playPauseButton.onclick = () => togglePlayPause(index, playPauseButton);

                    const trackName = document.createElement("span");
                    trackName.classList.add("track-name");
                    trackName.textContent = track.name;

                    trackDiv.appendChild(playPauseButton);
                    trackDiv.appendChild(trackName);
                    trackList.appendChild(trackDiv);
                });
            } catch (error) {
                console.error("Error loading tracks:", error);
            }
        }

        function togglePlayPause(index, button) {
            if (currentTrackIndex === index) {
                if (audio.paused) {
                    audio.play();
                    button.textContent = "⏸️";
                } else {
                    audio.pause();
                    button.textContent = "▶️";
                }
            } else {
                playTrack(index);
            }
        }

        function playTrack(index) {
            resetButtons();
            resetHighlights();

            currentTrackIndex = index;
            audio.src = tracks[index].url;
            audio.play();

            const playPauseButton = document.querySelectorAll("#track-list button")[index];
            playPauseButton.textContent = "⏸️";

            // Highlight the currently playing track
            const trackDivs = document.querySelectorAll(".track");
            trackDivs[index].classList.add("playing");

            audio.onended = () => {
                currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
                playTrack(currentTrackIndex);
            };
        }

        function resetButtons() {
            const buttons = document.querySelectorAll("#track-list button");
            buttons.forEach(button => button.textContent = "▶️");
        }

        function resetHighlights() {
            const trackDivs = document.querySelectorAll(".track");
            trackDivs.forEach(div => div.classList.remove("playing"));
        }

        // Pause button functionality
        document.getElementById("pause-button").onclick = () => {
            if (!audio.paused) {
                audio.pause();
                document.getElementById("pause-button").textContent = "▶";
            } else {
                audio.play();
                document.getElementById("pause-button").textContent = " ⏸ ";
            }
        };

        // Next button functionality
        document.getElementById("next-button").onclick = () => {
            if (currentTrackIndex === null) {
                currentTrackIndex = 0; 
            } else {
                currentTrackIndex = (currentTrackIndex + 1) % tracks.length; 
            }
            playTrack(currentTrackIndex);
        };

        // Previous button functionality
        document.getElementById("prev-button").onclick = () => {
            if (currentTrackIndex === null) {
                currentTrackIndex = tracks.length - 1; 
            } else {
                currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; 
            }
            playTrack(currentTrackIndex);
        };

        loadTracks();