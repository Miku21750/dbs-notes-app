export const addStoryView = {
    render() {
        return `
            <a href="#mainContent" class="skip-link">Skip to content</a>
            <section class="container">
                <h1>Tambah Cerita</h1>
                <form id="storyForm">
                    <label for="name">Nama</label>
                    <input type="text" id="name" name="name" required /><br />

                    <label for="description">Deskripsi</label>
                    <textarea id="description" name="description" required></textarea><br />

                    <label>Ambil Foto dari Kamera</label>
                    <div class="camera-wrapper">
                        <video id="camera" autoplay playsinline width="100%" height="200"></video>
                        <button type="button" id="takePhotoBtn">📸 Ambil Foto</button>
                        <canvas id="photoCanvas" style="display:none;"></canvas>
                        <img id="previewImage" />
                    </div>
                    <p>Atau unggah gambar (opsional):</p>
                    <input type="file" accept="image/*" id="photoInput" /><br />

                    <label for="map">Klik pada peta untuk menandai lokasi</label>
                    <div id="map" style="height: 200px;"></div><br />

                    <button type="submit">Kirim Cerita</button>
                    <p id="statusMsg"></p>
                </form>
            </section>
        `;
    }
}