import type { CurriculumManifestItem } from '../types/game';

export const curriculumManifest: CurriculumManifestItem[] = [
            {
                id: "M1",
                stageId: 1,
                moduleChapter: "Bab 1 & Bab 4",
                title: "Suspicious Vendor Email & Phishing",
                trainerCode: "TRN-S1",
                estimatedSlideRange: "Slide 5 - 12",
                learningObjective: [
                    "Mengenali indikator rekayasa sosial dan email phishing",
                    "Memahami bahaya ekstensi file manipulatif (.exe)",
                    "Mampu menerapkan proses verifikasi out-of-band"
                ],
                keyMessage: "Jangan pernah mempercayai pengirim hanya dari namanya. Selalu verifikasi instruksi mendesak atau perubahan data finansial secara langsung.",
                moduleSummary: "Modul ini mengajarkan cara mengidentifikasi ancaman rekayasa sosial, khususnya yang menargetkan staf operasional maritim melalui kedok vendor resmi pelabuhan atau agen logistik.",
                participantLearningCapsule: {
                    shortExplanation: "Phishing adalah upaya penipuan siber dengan menyamar sebagai pihak terpercaya (seperti agen atau vendor) untuk mencuri kredensial, uang, atau menyusupkan malware ke sistem kapal.",
                    keyPoints: [
                        "Periksa detail alamat email asli (waspadai typo/lookalike domain).",
                        "Abaikan kepanikan atau urgensi palsu yang memaksa Anda bertindak cepat.",
                        "Waspadai lampiran tak terduga, terutama yang berakhiran executable (.exe)."
                    ],
                    analogy: "Menerima email mendesak berlampiran aneh sama seperti menerima paket tak dikenal di pelabuhan. Jangan langsung membukanya sebelum Anda menelepon pengirim untuk verifikasi.",
                    commonMistake: "Mengklik link atau lampiran hanya karena ada logo perusahaan yang sangat dikenal.",
                    practicalReminder: "Gunakan saluran komunikasi lain (misal: telepon langsung ke nomor yang sudah Anda simpan) untuk memverifikasi permintaan mendesak."
                },
                trainerTalkingPoints: [
                    "Phishing dan Business Email Compromise (BEC) menyumbang lebih dari 80% pintu masuk awal insiden siber di industri maritim.",
                    "Tekankan bahwa kerugian finansial akibat salah transfer (typosquatting domain agen) tidak akan ditanggung asuransi jika terbukti kelalaian staf."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Anatomi Serangan Phishing Maritim",
                        points: ["Taktik manipulasi emosi dan urgensi.", "Pengelabuan nama pengirim (Display Name Spoofing).", "Risiko fatal dari lampiran .exe tersembunyi."]
                    },
                    {
                        title: "Modus Operandi: Vendor Impersonation",
                        points: ["Penyamaran sebagai agen logistik atau otoritas.", "Teknik Typosquatting (maritine vs maritime).", "Skema pengubahan instruksi rekening bank (BEC)."]
                    },
                    {
                        title: "Cara Melakukan Verifikasi Out-of-Band",
                        points: ["Definisi Out-of-band: Menggunakan jalur komunikasi yang berbeda.", "Kenapa tidak boleh membalas email penipu.", "Aturan wajib telepon silang sebelum transfer."]
                    },
                    {
                        title: "Prosedur Melaporkan Insiden Email",
                        points: ["Tindakan segera: Jangan forward, jangan diklik.", "Amankan bukti dengan melaporkan ke IT (Report Phishing button).", "Eskalasi ke tim keamanan siber internal."]
                    }
                ],
                connectedGameScenarios: ["Stage 1.1: Pembaruan Teknis", "Stage 1.2: Rekening Agen Logistik", "Stage 1.3: Ancaman Denda"],
                discussionQuestions: ["Pernahkah Anda menerima email aneh yang mengaku dari pihak otoritas pelabuhan? Apa yang Anda rasakan dan lakukan saat itu?"],
                expectedTakeaway: "Peserta tidak akan pernah mengklik link atau lampiran dari email mendesak tanpa melakukan verifikasi mandiri terlebih dahulu.",
                relatedFramework: ["NIST CSF: Protect (PR.AT), Detect (DE.CM)"],
                relatedControls: ["Security Awareness Training", "Email Filtering", "Anti-Spoofing (DMARC)"],
                visualSuggestion: "Gunakan screenshot perbandingan antara email asli vs email phishing yang sudah diberi anotasi merah pada bagian yang mencurigakan (seperti alamat email pengirim)."
            },
            {
                id: "M2",
                stageId: 2,
                moduleChapter: "Bab 2",
                title: "Know Your Maritime Assets",
                trainerCode: "TRN-S2",
                estimatedSlideRange: "Slide 13 - 20",
                learningObjective: [
                    "Membedakan antara aset IT dan aset OT di kapal",
                    "Mampu memetakan tingkat kekritisan sebuah aset",
                    "Memahami formula dasar perumusan risiko keamanan siber"
                ],
                keyMessage: "Anda tidak bisa melindungi apa yang tidak Anda ketahui. Pemetaan aset yang akurat adalah langkah paling pertama dalam keamanan siber.",
                moduleSummary: "Modul ini membangun pemahaman dasar mengenai manajemen aset maritim dan bagaimana merumuskan sebuah risiko dengan menggabungkan elemen Aset, Ancaman, Kerentanan, dan Dampak.",
                participantLearningCapsule: {
                    shortExplanation: "Di kapal, aset terbagi menjadi IT (Information Technology - untuk data/bisnis) dan OT (Operational Technology - untuk mesin/fisik). Keduanya memiliki prioritas perlindungan yang berbeda.",
                    keyPoints: [
                        "Aset OT (ECDIS, Engine Control) memprioritaskan Keselamatan (Safety) dan Ketersediaan.",
                        "Aset IT (Email, File Server) memprioritaskan Kerahasiaan (Confidentiality).",
                        "Rumus Risiko = Aset + Kerentanan (Kelemahan) + Ancaman (Hacker) + Dampak."
                    ],
                    analogy: "Menerapkan patch/update pada komputer admin (IT) bisa dilakukan kapan saja, tapi melakukan update pada sistem kemudi (OT) saat berlayar sama dengan mengganti ban mobil saat mobil sedang melaju kencang.",
                    commonMistake: "Menganggap semua perangkat komputer di kapal membutuhkan perlakuan keamanan siber yang sama persis.",
                    practicalReminder: "Selalu prioritaskan pelindungan pada sistem yang jika mati akan menyebabkan kapal berhenti beroperasi atau mengancam nyawa."
                },
                trainerTalkingPoints: [
                    "Gunakan insiden nyata (seperti NotPetya) untuk menunjukkan bagaimana jatuhnya sistem IT bisa melumpuhkan operasi OT di pelabuhan secara tidak langsung.",
                    "Ajarkan cara menulis 'Risk Statement' yang bebas dari asumsi atau emosi, fokus murni pada fakta teknis."
                ],
                suggestedSlideTitles: [
                    {
                        title: "IT vs OT di Lingkungan Maritim",
                        points: ["Perbedaan prioritas: Kerahasiaan (IT) vs Keselamatan Fisik (OT).", "Bahaya jika staf IT memperlakukan mesin OT seperti PC kantor.", "Pemisahan zona jaringan yang wajib dilakukan."]
                    },
                    {
                        title: "Menilai Business Impact & Criticality",
                        points: ["Apa itu Business Impact Analysis (BIA)?", "Memilih aset prioritas tertinggi (Tier 1).", "Dampak downtime aset terhadap operasi muat kargo."]
                    },
                    {
                        title: "Formula Risiko Siber",
                        points: ["Risk = Asset + Threat + Vulnerability + Impact.", "Contoh ancaman nyata (Supply chain attack).", "Pentingnya menutup Vulnerability (seperti VPN tanpa MFA)."]
                    },
                    {
                        title: "Latihan Menulis Risk Statement",
                        points: ["Hindari pernyataan yang berasumsi atau menyalahkan (blaming culture).", "Fokus pada akar masalah teknis (misal: port RDP terbuka).", "Menghubungkan pernyataan risiko dengan solusi kontrol."]
                    }
                ],
                connectedGameScenarios: ["Stage 2.1: Prioritas Aset", "Stage 2.2: Pemetaan Aset", "Stage 2.4: Menulis Pernyataan Risiko"],
                discussionQuestions: ["Jika kapal Anda terkena ransomware, sistem mana yang akan Anda minta tim IT untuk pulihkan pertama kali? Mengapa?"],
                expectedTakeaway: "Peserta memahami bahwa fokus utama perlindungan siber maritim adalah menjaga keselamatan jiwa dan operasional fisik kapal.",
                relatedFramework: ["NIST CSF: Identify (ID.AM, ID.RA)"],
                relatedControls: ["Asset Inventory", "Vulnerability Management"],
                visualSuggestion: "Tampilkan diagram Purdue Model yang disederhanakan untuk kapal, memisahkan area IT (hijau) dan OT (merah)."
            },
            {
                id: "M3",
                stageId: 3,
                moduleChapter: "Bab 3",
                title: "From Standard to Action",
                trainerCode: "TRN-S3",
                estimatedSlideRange: "Slide 21 - 28",
                learningObjective: [
                    "Mengenal lanskap regulasi siber maritim utama (IMO, IACS)",
                    "Membedakan antara kebijakan (Policy) dan bukti pelaksanaan (Artifact)",
                    "Memahami 5 fungsi inti NIST CSF (IPDRR)"
                ],
                keyMessage: "Kepatuhan (Compliance) bukan sekadar tumpukan dokumen kertas, melainkan implementasi nyata yang dapat dibuktikan keandalannya secara teknis.",
                moduleSummary: "Modul ini mengubah regulasi dan framework tingkat tinggi menjadi langkah praktis agar kapal dapat lolos audit dari PSC (Port State Control) maupun Class Society.",
                participantLearningCapsule: {
                    shortExplanation: "Industri maritim memiliki aturan siber yang ketat. IMO mensyaratkan manajemen risiko di tingkat perusahaan, sedangkan IACS (seperti UR E26 dan E27) mengatur spesifikasi teknis keamanan kapal dan perangkat.",
                    keyPoints: [
                        "IACS UR E26 berfokus pada arsitektur seluruh kapal (Ship-level).",
                        "IACS UR E27 berfokus pada keamanan bawaan perangkat dari vendor (Equipment-level).",
                        "NIST CSF menggunakan 5 fase: Identify, Protect, Detect, Respond, Recover."
                    ],
                    analogy: "Kebijakan/SOP adalah 'Peta Jalan' Anda, sementara Log Sistem/Bukti adalah 'Struk Tol' yang membuktikan kepada auditor bahwa Anda benar-benar telah melewati jalan tersebut.",
                    commonMistake: "Mengandalkan tumpukan dokumen SOP tebal namun gagal menunjukkan log teknis saat auditor meminta bukti penerapan.",
                    practicalReminder: "Setiap kali Anda menerapkan prosedur keamanan baru, pastikan Anda juga memikirkan: 'Bagaimana saya membuktikan ini kepada auditor bulan depan?'"
                },
                trainerTalkingPoints: [
                    "Jelaskan bahwa mulai tahun 2024, kapal baru (newbuilds) wajib mematuhi arsitektur aman (Secure by Design) sesuai regulasi kelas IACS.",
                    "Gunakan analogi bahwa CIS Controls adalah 'checklist praktis harian' sementara NIST CSF adalah 'laporan strategis untuk direksi'."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Peta Regulasi Siber Maritim",
                        points: ["Evolusi regulasi dari resolusi IMO 2021 hingga kewajiban IACS.", "Pentingnya mematuhi standar kelas agar kapal diizinkan berlayar.", "Perbedaan standar umum (ISO 27001) dengan teknis (IACS)."]
                    },
                    {
                        title: "Mendalami IACS UR E26 & E27",
                        points: ["E26: Integrasi keamanan arsitektur kapal secara keseluruhan.", "E27: Kewajiban vendor perangkat memasukkan fitur Secure by Design.", "Proses pengadaan alat harus menuntut sertifikat Type Approval E27."]
                    },
                    {
                        title: "Mengelola Bukti Audit (Evidence)",
                        points: ["Perbedaan krusial antara Policy (Kebijakan) dan Artifact (Bukti Teknis).", "Contoh Artifact: Log audit pengguna, laporan akses, bukti MFA.", "Mengapa auditor tidak boleh diberikan hak akses penuh (Admin)."]
                    },
                    {
                        title: "Kerangka NIST CSF & CIS Controls",
                        points: ["CIS Controls sebagai daftar tindakan harian teknis (To-Do List).", "NIST CSF (IPDRR) sebagai bahasa strategis untuk dewan direksi.", "Memetakan aksi teknis harian ke dalam strategi perusahaan yang lebih luas."]
                    }
                ],
                connectedGameScenarios: ["Stage 3.1: Standar Kapal Baru", "Stage 3.3: Bukti Penerapan", "Stage 3.5: Peta Jalan Keamanan"],
                discussionQuestions: ["Apa tantangan terbesar saat harus mengumpulkan bukti audit siber di tengah kesibukan operasional kapal?"],
                expectedTakeaway: "Peserta menyadari pentingnya menyimpan riwayat log dan mematuhi regulasi internasional untuk menghindari denda otoritas pelabuhan.",
                relatedFramework: ["NIST CSF: Govern (GV.OC)"],
                relatedControls: ["Security Policy", "Compliance Audit", "System Hardening"],
                visualSuggestion: "Buat timeline evolusi regulasi maritim dari IMO 2021 hingga kewajiban IACS 2024."
            },
            {
                id: "M4",
                stageId: 4,
                moduleChapter: "Bab 4 & Bab 8",
                title: "Threats at Sea and Port",
                trainerCode: "TRN-S4",
                estimatedSlideRange: "Slide 29 - 36",
                learningObjective: [
                    "Mengidentifikasi ancaman keamanan fisik siber di pelabuhan",
                    "Memahami risiko kebocoran kredensial dan jaringan terbuka",
                    "Mampu menerapkan keputusan operasional yang seimbang"
                ],
                keyMessage: "Keamanan siber tidak hanya terjadi di dunia maya. Ancaman fisik (seperti USB tak dikenal atau kertas password) adalah celah masuk paling mudah bagi peretas.",
                moduleSummary: "Modul ini membahas persimpangan antara keamanan siber dan keamanan fisik (Physical Security), di mana kelengahan kru di dunia nyata dapat menghancurkan pertahanan jaringan kapal.",
                participantLearningCapsule: {
                    shortExplanation: "Ancaman siber di area pelabuhan sering menargetkan kelengahan fisik kru. Menggunakan Wi-Fi publik tanpa pelindung atau mencolokkan USB asing dapat mem-bypass semua firewall mahal yang dimiliki kapal.",
                    keyPoints: [
                        "Jangan pernah mencolokkan perangkat/USB asing ke sistem operasional.",
                        "Kata sandi yang ditulis di kertas (Sticky Notes) adalah kerentanan kritikal.",
                        "Selalu gunakan VPN Korporat jika terpaksa menggunakan jaringan publik pelabuhan."
                    ],
                    analogy: "Mencolokkan USB tak dikenal yang Anda temukan di jalan sama bahayanya dengan meminum botol air terbuka yang Anda temukan di tempat umum. Anda tidak tahu racun apa yang ada di dalamnya.",
                    commonMistake: "Mengorbankan keamanan data perusahaan (seperti manifes) dengan menggunakan koneksi hotspot pribadi atau Wi-Fi pelabuhan terbuka demi kecepatan semata.",
                    practicalReminder: "Jadilah skeptis di dunia nyata. Laporkan anomali fisik (seperti orang asing di ruang server atau temuan USB) secepat Anda melaporkan email mencurigakan."
                },
                trainerTalkingPoints: [
                    "Diskusikan bahwa peretas kini sering menyuap staf lokal pelabuhan untuk menyisipkan USB (Drop Attack) alih-alih meretas dari luar negeri.",
                    "Tekankan bahwa VPN (Virtual Private Network) adalah penyelamat mutlak bagi kru yang sering berpindah koneksi di berbagai negara."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Keamanan Siber Fisik (Physical Cyber Security)",
                        points: ["Dunia siber tidak terpisahkan dari kontrol akses fisik.", "Kerentanan tamu pelabuhan yang tak diundang.", "Mencegah pencurian perangkat operasional yang menyimpan data."]
                    },
                    {
                        title: "Bahaya Rogue USB dan Kiosk Scanner",
                        points: ["Modus USB Drop Attack di dermaga (Social Engineering).", "Bagaimana malware bisa mem-bypass firewall menggunakan USB.", "Penerapan area aman Kiosk Scanner untuk memindai flashdisk asing."]
                    },
                    {
                        title: "Manajemen Kredensial di Ruang Kontrol",
                        points: ["Mengapa 'convenience' sering menghancurkan 'security'.", "Bahaya Sticky Notes password di monitor ECDIS.", "Prinsip akuntabilitas individual (satu orang, satu akun)."]
                    },
                    {
                        title: "Mengamankan Koneksi Transit",
                        points: ["Kerentanan Wi-Fi publik (Man-in-the-Middle Attack).", "Bahaya tethering hotspot pribadi untuk data perusahaan.", "Tugas VPN Korporat sebagai terowongan pelindung enkripsi."]
                    }
                ],
                connectedGameScenarios: ["Stage 4.1: USB Tertinggal", "Stage 4.2: Catatan Kredensial", "Stage 4.3: Wi-Fi Terbuka"],
                discussionQuestions: ["Jika kapal sedang kehilangan sinyal VSAT, bagaimana SOP resmi kapal Anda untuk mengirimkan dokumen kargo penting?"],
                expectedTakeaway: "Peserta akan menghilangkan kebiasaan berbagi password menggunakan catatan kertas dan selalu waspada terhadap perangkat asing.",
                relatedFramework: ["NIST CSF: Protect (PR.PS)"],
                relatedControls: ["Physical Access Control", "Removable Media Policy", "Data in Transit Encryption (VPN)"],
                visualSuggestion: "Tampilkan foto nyata 'sticky notes' dengan password yang menempel di monitor ruang anjungan kapal sebagai contoh studi kasus."
            },
            {
                id: "M5",
                stageId: 5,
                moduleChapter: "Bab 5",
                title: "Build the Defense Layer",
                trainerCode: "TRN-S5",
                estimatedSlideRange: "Slide 37 - 45",
                learningObjective: [
                    "Memahami prinsip Pertahanan Berlapis (Defense in Depth)",
                    "Menerapkan konsep Segmentasi Jaringan dan Least Privilege",
                    "Membedakan fungsi kontrol Preventive, Detective, dan Corrective"
                ],
                keyMessage: "Satu alat keamanan tidak akan pernah cukup. Bangunlah pertahanan berlapis di mana jika satu lapis gagal, lapisan berikutnya akan menghentikan ancaman.",
                moduleSummary: "Modul teknis namun praktis yang membahas implementasi kontrol-kontrol krusial (seperti MFA, Segmentasi, dan Logging) untuk melindungi aset dari intrusi pihak ketiga.",
                participantLearningCapsule: {
                    shortExplanation: "Defense in Depth adalah strategi menggunakan berbagai lapisan keamanan (Teknologi, Proses, Manusia) secara bersamaan. Lapisan ini mencakup pencegahan (Preventive), pendeteksian (Detective), dan pemulihan (Corrective).",
                    keyPoints: [
                        "Least Privilege: Berikan hak akses sekecil mungkin hanya sesuai kebutuhan tugas.",
                        "MFA (Multi-Factor Authentication) wajib untuk semua akses jarak jauh (Vendor VPN).",
                        "Segmentasi Jaringan: Jaringan Wi-Fi Kru tidak boleh bisa menjangkau jaringan mesin (OT)."
                    ],
                    analogy: "Mendesain keamanan kapal ibarat lambung ganda (double-hull). Jika lambung luar robek (password dicuri), kapal belum tenggelam karena ada lambung dalam (MFA) yang menahan air (hacker).",
                    commonMistake: "Memberikan akses admin penuh secara permanen (24/7) kepada teknisi vendor eksternal hanya demi kemudahan pemeliharaan.",
                    practicalReminder: "Backup data bukanlah alat penyelamat (Corrective Control) yang sah sampai Anda berhasil melakukan Uji Pemulihan (Restore Test) secara rutin."
                },
                trainerTalkingPoints: [
                    "Bedah insiden Ransomware maritim: hampir semuanya berawal dari tidak adanya Segmentasi Jaringan antara IT kantor dan sistem kapal.",
                    "Ingatkan bahwa 'Logging' adalah mata dan telinga; tanpa log yang diaktifkan, investigasi akan menemui jalan buntu."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Konsep Defense in Depth",
                        points: ["Membangun lapisan keamanan berlapis (Teknologi, Proses, Manusia).", "Mengenal jenis kontrol: Preventive, Detective, dan Corrective.", "Kenapa Antivirus saja tidak pernah cukup menghadapi ancaman modern."]
                    },
                    {
                        title: "Menertibkan Akses Vendor (MFA & JIT)",
                        points: ["Bahaya akun VPN Vendor yang dibiarkan aktif 24/7.", "Implementasi Multi-Factor Authentication (MFA) secara ketat.", "Prosedur Just-In-Time (JIT) akses berbasis tiket perbaikan."]
                    },
                    {
                        title: "Segmentasi Jaringan IT/OT",
                        points: ["Memisahkan Wi-Fi Kru dari sistem kritis mesin (OT).", "Mencegah penyeberangan malware (Lateral Movement).", "Pemetaan batas jaringan sesuai standar IACS dan IEC 62443."]
                    },
                    {
                        title: "Ilusi Backup Tanpa Restore Test",
                        points: ["Kenapa status 'Backup Completed' seringkali menyesatkan.", "Pentingnya Backup yang terpisah dan Immutable.", "Kewajiban melakukan Drill/Uji Coba Restore secara rutin."]
                    }
                ],
                connectedGameScenarios: ["Stage 5.1: Akses Vendor", "Stage 5.3: Segmentasi Wi-Fi Kru", "Stage 5.4: Ilusi Data Cadangan"],
                discussionQuestions: ["Apakah vendor pembuat mesin kapal Anda saat ini memiliki akses jarak jauh (Remote Access) ke kapal? Bagaimana Anda mengamankannya?"],
                expectedTakeaway: "Peserta mengerti pentingnya membatasi hak akses dan memisahkan area jaringan operasional yang kritis.",
                relatedFramework: ["NIST CSF: Protect (PR.AC, PR.DS), Detect (DE.CM)"],
                relatedControls: ["MFA", "Network Segmentation", "Logging", "Backup Testing"],
                visualSuggestion: "Gunakan diagram infografis 'Swiss Cheese Model' untuk mengilustrasikan bagaimana kelemahan di berbagai lapisan jika sejajar dapat membiarkan ancaman masuk."
            },
            {
                id: "M6",
                stageId: 6,
                moduleChapter: "Bab 6 & Bab 9",
                title: "From Alert to Action",
                trainerCode: "TRN-S6",
                estimatedSlideRange: "Slide 46 - 54",
                learningObjective: [
                    "Membedakan Event harian dari sebuah Incident (Insiden)",
                    "Mampu memimpin fase Triage dan klasifikasi Severity awal",
                    "Melakukan tindakan Containment (Pengisolasian) yang tepat"
                ],
                keyMessage: "Saat insiden terjadi, jangan panik dan jangan hancurkan bukti. Isolasi sistem yang terinfeksi dan segera panggil bantuan sesuai rantai komando.",
                moduleSummary: "Modul ini melatih kemampuan merespons kondisi darurat siber. Peserta belajar membaca indikator log serangan, menetapkan tingkat keparahan krisis, dan melakukan pengisolasian darurat.",
                participantLearningCapsule: {
                    shortExplanation: "Incident Response (Respons Insiden) adalah prosedur darurat layaknya pemadam kebakaran. Tujuannya adalah mengidentifikasi titik api (Triage), melokalisir agar tidak menyebar (Containment), lalu melapor ke atasan (Escalation).",
                    keyPoints: [
                        "Event adalah kejadian normal. Incident adalah kejadian merusak (misal: ekstensi file berubah masal).",
                        "Severity (Keparahan) ditentukan oleh nilai aset dan status serangan (masih aktif menyebar atau tidak).",
                        "Isolasi Jaringan (cabut kabel LAN / matikan koneksi) adalah tindakan Containment terbaik."
                    ],
                    analogy: "Jika seseorang tergigit ular berbisa, Anda akan mengikat erat lengannya agar racun tidak menyebar ke jantung (Containment jaringan), BUKAN langsung menembak mati orang tersebut (Mematikan daya server/Power Off).",
                    commonMistake: "Mencabut colokan listrik (Power Down) server yang terkena ransomware. Ini akan menghapus bukti penting di memori (RAM) secara permanen.",
                    practicalReminder: "Jangan pernah menyebarkan kepanikan atau memposting insiden siber aktif ke media sosial pribadi. Komunikasi krisis harus terpusat via DPA/CSO."
                },
                trainerTalkingPoints: [
                    "Ajarkan teknik 'Triage' layaknya paramedis medis: fokus pada sumber pendarahan terbesar terlebih dahulu dengan menganalisis jejak Log.",
                    "Tekankan betapa krusialnya memiliki daftar kontak darurat Incident Response yang tercetak di ruang kendali anjungan."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Siklus Incident Response Plan (IRP)",
                        points: ["Tahapan IRP: Preparation, Identification, Containment, Eradication, Recovery.", "Membedakan peringatan palsu (False Positive) dari Insiden Nyata.", "Tujuan utama Triage: Melokalisir ancaman awal."]
                    },
                    {
                        title: "Menilai Severity Insiden",
                        points: ["Kriteria penentuan: Nilai Aset, Dampak Bisnis, Penyebaran.", "Contoh matriks keparahan (Low, Medium, High, Critical).", "Kapan mendeklarasikan insiden sebagai Krisis Bisnis."]
                    },
                    {
                        title: "Do's and Don'ts saat Containment",
                        points: ["DO: Putuskan jaringan fisik (cabut kabel LAN) atau logis (VLAN).", "DON'T: Matikan daya listrik (Power off) server yang terinfeksi.", "Mencegah penghancuran bukti forensik volatile (RAM)."]
                    },
                    {
                        title: "Prosedur Komunikasi Darurat (Escalation)",
                        points: ["Aturan rantai komando: Laporkan ke Kapten dan SOC/DPA.", "Bahaya kebocoran informasi ke media sosial atau publik.", "Melindungi reputasi perusahaan di tengah krisis (Need-to-Know basis)."]
                    }
                ],
                connectedGameScenarios: ["Stage 6.1: Event vs Incident", "Stage 6.3: Menentukan Severity", "Stage 6.4: Tindakan Containment"],
                discussionQuestions: ["Jika jam 3 pagi ECDIS kapal Anda tiba-tiba menampilkan pesan tebusan ransomware, siapa orang pertama yang akan Anda hubungi?"],
                expectedTakeaway: "Peserta mampu melakukan pengisolasian jaringan secara fisik/logis dengan percaya diri tanpa merusak perangkat atau bukti forensik.",
                relatedFramework: ["NIST CSF: Detect (DE.AE), Respond (RS.MI, RS.CO)"],
                relatedControls: ["Incident Response Plan", "Network Isolation", "Crisis Communication"],
                visualSuggestion: "Tampilkan tabel matriks standar untuk menentukan 'Severity Level' (Low, Medium, High, Critical) berdasarkan matriks Dampak vs Penyebaran."
            },
            {
                id: "M7",
                stageId: 7,
                moduleChapter: "Bab 10",
                title: "Recover and Improve",
                trainerCode: "TRN-S7",
                estimatedSlideRange: "Slide 55 - 62",
                learningObjective: [
                    "Memahami syarat teknis sebelum memulihkan sistem (Restore)",
                    "Mengetahui prosedur pengamanan bukti forensik siber",
                    "Mampu memfasilitasi rapat Lessons Learned yang konstruktif"
                ],
                keyMessage: "Pemulihan bukanlah akhir dari insiden. Tanpa perbaikan berkelanjutan (Lessons Learned), peretas akan kembali masuk melalui celah yang sama esok hari.",
                moduleSummary: "Modul pamungkas ini mengajarkan fase pasca-insiden. Bagaimana cara membangun kembali operasional secara aman, mengamankan barang bukti, dan menyusun rencana perbaikan masa depan.",
                participantLearningCapsule: {
                    shortExplanation: "Fase Recovery (Pemulihan) bukan sekadar menekan tombol 'Restore Backup'. Anda harus memastikan sistem sudah bersih (Eradicated), mengamankan bukti (Forensics), dan mengevaluasi kesalahan (Improve).",
                    keyPoints: [
                        "Jangan restore data sebelum akar masalah (Root Cause) ditemukan dan ditutup.",
                        "Lakukan Copy Forensik (Evidence Pack) sebelum memformat hard disk yang terinfeksi.",
                        "Rapat 'Lessons Learned' bertujuan memperbaiki sistem, bukan untuk saling menyalahkan."
                    ],
                    analogy: "Jika rumah Anda baru saja kerampokan karena kunci gembok rusak, jangan langsung memasukkan perabotan baru ke dalam rumah sebelum Anda mengganti dan memperbaiki kunci gembok tersebut.",
                    commonMistake: "Segera memformat ulang (Wipe) server yang terinfeksi untuk mengejar kecepatan, yang mana tindakan ini menghancurkan 'TKP' dan bukti asuransi.",
                    practicalReminder: "Siklus NIST CSF tidak berakhir di garis finish. Fase Recover harus selalu menyambung kembali ke fase Identify (Identifikasi aset/risiko baru) untuk peningkatan berkesinambungan."
                },
                trainerTalkingPoints: [
                    "Bahas pentingnya 'Chain of Custody' dalam forensik agar klaim asuransi (Cyber Insurance) tidak ditolak oleh pihak penjamin.",
                    "Pandu cara memilih 30-Day Action Plan yang berimbang antara perbaikan proses administrasi dan perbaikan arsitektur teknis."
                ],
                suggestedSlideTitles: [
                    {
                        title: "Kapan Aman untuk Melakukan Restore?",
                        points: ["Wajib menyelesaikan fase Eradication (Pembersihan).", "Bahaya memulihkan backup ke jaringan yang masih berkompromi.", "Validasi ulang keamanan sebelum Go-Live operasional."]
                    },
                    {
                        title: "Menjaga Integritas Bukti Forensik",
                        points: ["Jangan format/wipe server tanpa izin tertulis ahli forensik.", "Membuat Evidence Pack (Memory Dump, Disk Image).", "Kewajiban regulasi untuk laporan asuransi dan pihak berwajib."]
                    },
                    {
                        title: "Rapat Evaluasi (Lessons Learned)",
                        points: ["Waktu terbaik menggelar evaluasi pasca-insiden.", "Menghindari Blame Culture dan mencari akar kelemahan teknis.", "Mendokumentasikan temuan untuk pembaruan SOP internal."]
                    },
                    {
                        title: "Rencana Aksi Perbaikan (Continuous Improvement)",
                        points: ["Implementasi prioritas rencana aksi 30 Hari.", "Membawa pelajaran kembali ke fase awal siklus keamanan (Identify).", "Menjadikan insiden sebagai momentum penguatan postur keamanan armada."]
                    }
                ],
                connectedGameScenarios: ["Stage 7.1: Validasi Sebelum Pemulihan", "Stage 7.3: Mengamankan Bukti", "Stage 7.5: Rencana Aksi 30-Hari"],
                discussionQuestions: ["Mengapa 'Blame Culture' (Budaya Menyalahkan) dapat menghancurkan postur keamanan siber perusahaan dalam jangka panjang?"],
                expectedTakeaway: "Peserta memahami siklus utuh ketahanan siber dan pentingnya pembelajaran berkelanjutan untuk mencegah re-infeksi.",
                relatedFramework: ["NIST CSF: Recover (RC.RP, RC.IM)"],
                relatedControls: ["Forensic Readiness", "Disaster Recovery Plan", "Lessons Learned Review"],
                visualSuggestion: "Tampilkan siklus roda berputar (infinity loop) dari NIST CSF untuk menekankan bahwa Cyber Resilience adalah perjalanan panjang tanpa henti, bukan sekadar garis akhir."
            }
        ];
