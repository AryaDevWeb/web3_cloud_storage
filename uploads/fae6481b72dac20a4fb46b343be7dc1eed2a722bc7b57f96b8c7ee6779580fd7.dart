import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Berita Online',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const NewsHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class NewsArticle {
  final String title;
  final String description;
  final String url;
  final String urlToImage;
  final String publishedAt;
  final String source;
  final String content;

  const NewsArticle({
    required this.title,
    required this.description,
    required this.url,
    required this.urlToImage,
    required this.publishedAt,
    required this.source,
    required this.content,
  });

  factory NewsArticle.fromJson(Map<String, dynamic> json) {
    return NewsArticle(
      title: json['title'] ?? 'No Title',
      description: json['description'] ?? 'No Description',
      url: json['url'] ?? '',
      urlToImage: json['urlToImage'] ?? '',
      publishedAt: json['publishedAt'] ?? '',
      source: json['source']['name'] ?? 'Unknown Source',
      content: json['content'] ?? 'No Content Available',
    );
  }
}

class NewsHomePage extends StatefulWidget {
  const NewsHomePage({super.key});

  @override
  State<NewsHomePage> createState() => _NewsHomePageState();
}

class _NewsHomePageState extends State<NewsHomePage> {
  List<NewsArticle> _newsArticles = [];
  bool _isLoading = true;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _loadNews();
  }

  Future<void> _loadNews() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      await _loadDummyNews();
    } catch (e) {
      setState(() {
        _errorMessage = 'Gagal memuat berita: $e';
        _isLoading = false;
      });
    }
  }


  String _getRelevantImage(String title, String category) {
    final keyword = category.toLowerCase();
    
    if (keyword.contains('teknologi') || keyword.contains('ai') || keyword.contains('digital')) {
      return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop';
    } else if (keyword.contains('ekonomi') || keyword.contains('bisnis') || keyword.contains('uang')) {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop';
    } else if (keyword.contains('olahraga') || keyword.contains('sepak bola') || keyword.contains('timnas')) {
      return 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=200&fit=crop';
    } else if (keyword.contains('kesehatan') || keyword.contains('medis') || keyword.contains('dokter')) {
      return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop';
    } else if (keyword.contains('budaya') || keyword.contains('seni') || keyword.contains('festival')) {
      return 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=200&fit=crop';
    } else if (keyword.contains('pendidikan') || keyword.contains('sekolah') || keyword.contains('kampus')) {
      return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop';
    } else if (keyword.contains('startup') || keyword.contains('teknologi') || keyword.contains('inovasi')) {
      return 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=200&fit=crop';
    } else if (keyword.contains('lingkungan') || keyword.contains('iklim') || keyword.contains('alam')) {
      return 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=200&fit=crop';
    } else {
    
      if (title.toLowerCase().contains('indonesia')) {
        return 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=400&h=200&fit=crop';
      } else if (title.toLowerCase().contains('teknologi')) {
        return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop';
      } else {
        return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=200&fit=crop';
      }
    }
  }

  Future<void> _loadDummyNews() async {
  
    final dummyNews = [
      NewsArticle(
        title: 'Teknologi AI Terbaru Mengubah Dunia',
        description: 'Perkembangan artificial intelligence yang pesat membawa perubahan signifikan dalam berbagai industri.',
        url: 'https://example.com/ai-technology',
        urlToImage: _getRelevantImage('Teknologi AI Terbaru Mengubah Dunia', 'teknologi'),
        publishedAt: '2024-01-15T10:30:00Z',
        source: 'Tech News',
        content: 'Artificial Intelligence terus berkembang dengan cepat dalam beberapa tahun terakhir. Teknologi ini telah mengubah cara kita bekerja, berkomunikasi, dan memecahkan masalah kompleks. Perusahaan-perusahaan besar berinvestasi besar-besaran dalam penelitian AI untuk menciptakan solusi yang lebih efisien dan inovatif.',
      ),
      NewsArticle(
        title: 'Ekonomi Global Menunjukkan Pemulihan',
        description: 'Indikator ekonomi global menunjukkan tanda-tanda pemulihan pasca pandemi.',
        url: 'https://example.com/global-economy',
        urlToImage: _getRelevantImage('Ekonomi Global Menunjukkan Pemulihan', 'ekonomi'),
        publishedAt: '2024-01-15T09:15:00Z',
        source: 'Business Daily',
        content: 'Perekonomian global mulai menunjukkan tanda-tanda pemulihan yang stabil setelah mengalami tantangan selama pandemi. Pertumbuhan GDP di berbagai negara menunjukkan tren positif, dengan sektor manufaktur dan jasa memimpin pemulihan ini.',
      ),
      NewsArticle(
        title: 'Timnas Indonesia Siap Hadapi Piala Dunia',
        description: 'Persiapan timnas Indonesia menuju kualifikasi Piala Dunia 2026 semakin intensif.',
        url: 'https://example.com/indonesia-worldcup',
        urlToImage: _getRelevantImage('Timnas Indonesia Siap Hadapi Piala Dunia', 'olahraga'),
        publishedAt: '2024-01-15T08:45:00Z',
        source: 'Sports Indonesia',
        content: 'Timnas Indonesia terus berbenah menghadapi kualifikasi Piala Dunia 2026. Pelatih baru telah menerapkan strategi permainan yang lebih ofensif dengan fokus pada pengembangan pemain muda berbakat. Dukungan dari suporter diharapkan dapat menjadi motivasi tambahan bagi tim.',
      ),
      NewsArticle(
        title: 'Inovasi Terbaru di Bidang Kesehatan',
        description: 'Penemuan baru dalam dunia medis memberikan harapan bagi pasien penyakit langka.',
        url: 'https://example.com/health-innovation',
        urlToImage: _getRelevantImage('Inovasi Terbaru di Bidang Kesehatan', 'kesehatan'),
        publishedAt: '2024-01-14T16:20:00Z',
        source: 'Health Today',
        content: 'Para peneliti berhasil menemukan terapi baru untuk penyakit langka yang selama ini sulit diobati. Terapi ini menggunakan pendekatan genetik revolusioner yang dapat menyembuhkan penyakit pada tingkat seluler.',
      ),
      NewsArticle(
        title: 'Festival Budaya Nusantara 2024',
        description: 'Festival budaya terbesar se-Indonesia akan digelar bulan depan.',
        url: 'https://example.com/culture-festival',
        urlToImage: _getRelevantImage('Festival Budaya Nusantara 2024', 'budaya'),
        publishedAt: '2024-01-14T14:10:00Z',
        source: 'Culture News',
        content: 'Festival budaya nusantara akan menampilkan kekayaan budaya dari seluruh Indonesia. Acara ini akan menampilkan tarian tradisional, musik daerah, kuliner khas, dan berbagai workshop kebudayaan.',
      ),
    ];

    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _newsArticles = dummyNews;
      _isLoading = false;
    });
  }

  Future<void> _refreshNews() async {
    await _loadNews();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Berita Hari Ini',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Colors.blue[800],
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _refreshNews,
            tooltip: 'Refresh',
          ),
        ],
      ),
      body: _buildBody(),
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text('Memuat berita...'),
          ],
        ),
      );
    }

    if (_errorMessage.isNotEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text(
              _errorMessage,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _refreshNews,
              child: const Text('Coba Lagi'),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _refreshNews,
      child: ListView.builder(
        itemCount: _newsArticles.length,
        itemBuilder: (context, index) {
          final article = _newsArticles[index];
          return NewsCard(article: article);
        },
      ),
    );
  }

  Widget _buildBottomNavigationBar() {
    return BottomNavigationBar(
      currentIndex: 0,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Beranda',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.explore),
          label: 'Jelajah',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.bookmark),
          label: 'Disimpan',
        ),
      ],
    );
  }
}

class NewsCard extends StatelessWidget {
  final NewsArticle article;

  const NewsCard({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8),
      elevation: 2,
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => NewsDetailPage(article: article),
            ),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildImage(),
            _buildContent(),
          ],
        ),
      ),
    );
  }

  Widget _buildImage() {
    return Container(
      height: 200,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(4),
          topRight: Radius.circular(4),
        ),
        image: DecorationImage(
          image: NetworkImage(article.urlToImage),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildContent() {
    return Padding(
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            article.source,
            style: TextStyle(
              color: Colors.blue[700],
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            article.title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          Text(
            article.description,
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[700],
            ),
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          _buildDateInfo(),
        ],
      ),
    );
  }

  Widget _buildDateInfo() {
    return Row(
      children: [
        const Icon(Icons.access_time, size: 14, color: Colors.grey),
        const SizedBox(width: 4),
        Text(
          _formatDate(article.publishedAt),
          style: const TextStyle(
            fontSize: 12,
            color: Colors.grey,
          ),
        ),
      ],
    );
  }

  String _formatDate(String dateString) {
    try {
      final date = DateTime.parse(dateString);
      return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
    } catch (e) {
      return 'Tanggal tidak tersedia';
    }
  }
}

class NewsDetailPage extends StatelessWidget {
  final NewsArticle article;

  const NewsDetailPage({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detail Berita'),
        backgroundColor: Colors.blue[800],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetailImage(),
            const SizedBox(height: 16),
            _buildSourceInfo(),
            const SizedBox(height: 8),
            _buildTitle(),
            const SizedBox(height: 16),
            _buildDateInfo(),
            const SizedBox(height: 16),
            _buildContent(),
            const SizedBox(height: 24),
            _buildShareButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailImage() {
    return Container(
      height: 250,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        image: DecorationImage(
          image: NetworkImage(article.urlToImage),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildSourceInfo() {
    return Text(
      article.source,
      style: TextStyle(
        color: Colors.blue[700],
        fontSize: 14,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildTitle() {
    return Text(
      article.title,
      style: const TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildDateInfo() {
    return Row(
      children: [
        const Icon(Icons.access_time, size: 16, color: Colors.grey),
        const SizedBox(width: 4),
        Text(
          _formatDate(article.publishedAt),
          style: const TextStyle(
            fontSize: 14,
            color: Colors.grey,
          ),
        ),
      ],
    );
  }

  Widget _buildContent() {
    return Text(
      article.content,
      style: const TextStyle(
        fontSize: 16,
        height: 1.6,
      ),
      textAlign: TextAlign.justify,
    );
  }

  Widget _buildShareButton() {
    return ElevatedButton(
      onPressed: () {
        // Add share functionality here
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue[700],
        foregroundColor: Colors.white,
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.share),
          SizedBox(width: 8),
          Text('Bagikan Berita'),
        ],
      ),
    );
  }

  String _formatDate(String dateString) {
    try {
      final date = DateTime.parse(dateString);
      return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
    } catch (e) {
      return 'Tanggal tidak tersedia';
    }
  }
}