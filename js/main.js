/* ============================================================
   史瑞祺 · 个人简历 | 交互逻辑
   - 中英文切换（localStorage 记忆）
   - 滚动入场动效 / 导航高亮 / 移动端菜单
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 双语词典 ----------
     修改文案的入口：
     - zh = 中文，en = 英文，两套键名一一对应
     - 页面里凡是带 data-i18n="键名" 的元素，文字都会从这里读取
     - 想改某处文案：先找到 index.html 里对应的 data-i18n 键名，再改这里中英两行
     - 想新增一段可切换的文案：
         1) 在 index.html 对应元素加 data-i18n="myNewKey"
         2) 在本对象 zh 和 en 里各加一行 myNewKey: "文案"
         3) 英文键也要加，否则切换英文时会保留旧中文
  */
  var I18N = {
    zh: {
      // 文档
      docTitle: "史瑞祺 | 个人简历",
      docDesc: "史瑞祺 — 地理信息科学 2026 届毕业生，求职方向：前端工程师 / 机器学习工程师 / GIS 工程师",

      // 导航
      navAbout: "关于我",
      navExperience: "经历",
      navProjects: "项目",
      navSkills: "技能",
      navContact: "联系",

      // Hero
      heroKicker: "南京晓庄学院 · 2026 届毕业生",
      heroSub: "地理信息科学 · 前端 / 机器学习 / GIS 工程师",
      heroCta1: "查看项目",
      heroCta2: "联系我",
      heroNextLabel: "NEXT STEP",
      heroNextValue: "2026 届应届生 · 求职中",

      // 工卡
      cardHover: "悬停查看",
      cardName: "史瑞祺",
      cardNameEn: "SHI RUIQI",
      cardRole: "地理信息科学 · 2026 届",
      cardNo: "NO. 2026 · GEE RESEARCHER",

      // 关于我
      aboutTitle: "用代码和空间数据理解世界",
      aboutBody:
        "我是史瑞祺，南京晓庄学院地理信息科学专业 2026 届毕业生，求职方向为前端工程师、机器学习工程师与 GIS 工程师。" +
        "无论是用 Google Earth Engine 分析南极海冰的时空变化，还是把数据变成直观的网页可视化，我都喜欢亲自动手，把想法做成看得见的东西。",
      aboutQuote: "把数据变成故事，把地图变成产品。",
      aboutQuoteAuthor: "— 史瑞祺",

      // 经历
      expTitle: "On Track · 经历",
      expItem1Date: "2026 · 2 个月",
      expItem1Title: "数据标注实习生",
      expItem1Org: "图灵深视（北京）科技有限公司",
      expItem1Desc: "参与数据标注与质量检查流程，按标注规范完成任务，为模型训练提供高质量的数据支撑。",
      expItem2Date: "2022 – 2026",
      expItem2Title: "地理信息科学 · 本科",
      expItem2Org: "南京晓庄学院",
      expItem2Desc: "系统学习地理信息系统、遥感、测绘与空间数据分析课程，掌握遥感影像处理、GIS 制图与空间分析等技能。",

      // 项目
      projTitle: "Featured · 项目",
      projFeaturedTag: "毕业论文 · 重点项目",
      projFeaturedTitle: "基于 Google Earth Engine 的南极普里兹湾海冰密集度监测研究",
      projFeaturedDesc:
        "基于 Google Earth Engine 云平台，处理 2020–2024 年共 20 个季度的 Sentinel-1 SAR 影像（EW 模式，HH/HV 双极化），融合后向散射强度、极化比（NDPI）与 GLCM 纹理熵多特征，构建随机森林分类模型，对南极普里兹湾海冰密集度进行逐季监测与时空演变分析。平均总体精度 86.43%，冬季最高达 91.45%；并识别出达恩利角冰间湖（5,000–17,000 km²）的时空动态。",
      statOa: "平均总体精度 OA",
      statKappa: "平均 Kappa 系数",
      statPeriods: "季度监测时段",
      statWinter: "冬季最高精度",
      chipSar: "Sentinel-1 SAR",
      chipRf: "随机森林",
      chipPolar: "HH/HV 双极化",
      projCourseTag: "课程项目",
      projCourseSub: "专业课程中完成的学习项目与实验",

      // 课程项目
      c1: "遥感数字图像处理",
      c2: "地理信息系统原理",
      c3: "Web 程序设计",
      c4: "数据库原理与应用",
      c5: "Java 程序设计",
      c6: "Python 程序设计",
      c7: "GIS 软件应用",
      c8: "GIS 三维建模",

      // 标签（chips）
      chipRemote: "遥感影像处理",
      chipSpatio: "时空变化分析",
      chipRect: "影像校正 / 分类",
      chipSpatial: "空间分析",
      chipWeb: "网页开发",
      chipDb: "数据库设计",
      chipOop: "面向对象",
      chipData: "数据处理",
      chipCarto: "制图与出图",
      chip3d: "三维场景建模",
      chipModeling: "三维建模",
      chipViz: "可视化",
      chipResp: "响应式布局",
      chipInter: "网页交互",
      chipMl: "机器学习基础",

      // 技能
      skillsTitle: "Off Track · 技能",
      skill1Title: "前端开发",
      skill1Desc: "具备网页开发基础，能够构建响应式、交互良好的页面。",
      skill2Title: "机器学习与数据处理",
      skill2Desc: "掌握 Python 与数据处理分析基础，了解机器学习基本原理。",
      skill3Title: "GIS 与遥感",
      skill3Desc: "熟悉常用 GIS 软件与遥感影像处理，具备空间数据分析能力。",

      // 联系
      contactTitle: "让我们保持联系",
      contactSub: "正在寻找前端 / 机器学习 / GIS 方向的实习与全职机会，欢迎任何形式的交流。",
      contactGithubLabel: "GitHub",
      contactNote: "通常会在 24 小时内回复。",

      // 页脚
      footerText: "© 2026 史瑞祺. 保留所有权利.",
      footerTop: "回到顶部 ↑"
    },

    en: {
      // Document
      docTitle: "Shi Ruiqi | Resume",
      docDesc: "Shi Ruiqi — 2026 GIS graduate. Open to Frontend / Machine Learning / GIS Engineer roles",

      // Nav
      navAbout: "About",
      navExperience: "Experience",
      navProjects: "Projects",
      navSkills: "Skills",
      navContact: "Contact",

      // Hero
      heroKicker: "Nanjing Xiaozhuang University · Class of 2026",
      heroSub: "Geographic Information Science · Frontend / ML / GIS Engineer",
      heroCta1: "View Projects",
      heroCta2: "Contact Me",
      heroNextLabel: "NEXT STEP",
      heroNextValue: "2026 Graduate · Open to work",

      // ID Card
      cardHover: "Hover to explore",
      cardName: "Shi Ruiqi",
      cardNameEn: "SHI RUIQI",
      cardRole: "GIS · Class of 2026",
      cardNo: "NO. 2026 · GEE RESEARCHER",

      // About
      aboutTitle: "Understanding the world with code and spatial data",
      aboutBody:
        "I'm Shi Ruiqi, a 2026 graduate in Geographic Information Science from Nanjing Xiaozhuang University, " +
        "seeking opportunities as a Frontend Engineer, Machine Learning Engineer, or GIS Engineer. " +
        "Whether it's analyzing sea ice change in Antarctica with Google Earth Engine or turning data into intuitive web visualizations, " +
        "I enjoy building things with my own hands.",
      aboutQuote: "Turn data into stories, maps into products.",
      aboutQuoteAuthor: "— Shi Ruiqi",

      // Experience
      expTitle: "On Track · Experience",
      expItem1Date: "2026 · 2 months",
      expItem1Title: "Data Annotation Intern",
      expItem1Org: "Turing Vision (Beijing) Technology Co., Ltd.",
      expItem1Desc:
        "Participated in data annotation and quality-check workflows, completing annotation tasks to specification and supporting high-quality training data for models.",
      expItem2Date: "2022 – 2026",
      expItem2Title: "B.S. Geographic Information Science",
      expItem2Org: "Nanjing Xiaozhuang University",
      expItem2Desc:
        "Studied geographic information systems, remote sensing, surveying, and spatial data analysis, gaining skills in remote sensing image processing, GIS mapping, and spatial analysis.",

      // Projects
      projTitle: "Featured · Projects",
      projFeaturedTag: "Thesis · Featured Project",
      projFeaturedTitle: "Sea Ice Concentration Monitoring in Antarctica's Prydz Bay Based on Google Earth Engine",
      projFeaturedDesc:
        "Processed 20 seasonal Sentinel-1 SAR scenes (EW mode, HH/HV dual-pol) from 2020 to 2024 on the Google Earth Engine cloud platform. Fused backscatter intensity, polarization ratio (NDPI), and GLCM texture entropy to build a Random Forest classifier for seasonal sea-ice concentration monitoring and spatiotemporal analysis of Prydz Bay, Antarctica. Achieved an average overall accuracy of 86.43% (up to 91.45% in winter), and captured the dynamics of the Cape Darnley polynya (5,000–17,000 km²).",
      statOa: "Avg Overall Accuracy",
      statKappa: "Avg Kappa",
      statPeriods: "Seasonal Periods",
      statWinter: "Best (Winter)",
      chipSar: "Sentinel-1 SAR",
      chipRf: "Random Forest",
      chipPolar: "HH/HV Dual-Pol",
      projCourseTag: "Course Projects",
      projCourseSub: "Learning projects and labs completed in major courses",

      // Course projects
      c1: "Remote Sensing Digital Image Processing",
      c2: "Principles of Geographic Information Systems",
      c3: "Web Programming",
      c4: "Database Principles and Applications",
      c5: "Java Programming",
      c6: "Python Programming",
      c7: "GIS Software Applications",
      c8: "3D GIS Modeling",

      // Chips
      chipRemote: "Remote Sensing",
      chipSpatio: "Spatiotemporal Analysis",
      chipRect: "Image Correction / Classification",
      chipSpatial: "Spatial Analysis",
      chipWeb: "Web Development",
      chipDb: "Database Design",
      chipOop: "OOP",
      chipData: "Data Processing",
      chipCarto: "Mapping & Cartography",
      chip3d: "3D Scene Modeling",
      chipModeling: "3D Modeling",
      chipViz: "Visualization",
      chipResp: "Responsive Layout",
      chipInter: "Web Interaction",
      chipMl: "ML Fundamentals",

      // Skills
      skillsTitle: "Off Track · Skills",
      skill1Title: "Frontend Development",
      skill1Desc: "Solid foundation in web development, building responsive and interactive pages.",
      skill2Title: "Machine Learning & Data",
      skill2Desc: "Python and data processing/analysis fundamentals, familiar with core ML concepts.",
      skill3Title: "GIS & Remote Sensing",
      skill3Desc: "Proficient with common GIS software and remote sensing image processing, with spatial data analysis skills.",

      // Contact
      contactTitle: "Let's stay in touch",
      contactSub: "Open to internships and full-time roles in Frontend / Machine Learning / GIS — happy to connect anytime.",
      contactGithubLabel: "GitHub",
      contactNote: "Usually replies within 24 hours.",

      // Footer
      footerText: "© 2026 Shi Ruiqi. All rights reserved.",
      footerTop: "Back to top ↑"
    }
  };

  var LANG_KEY = "srq-lang";

  function currentLang() {
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) { /* 隐私模式下忽略 */ }
    return saved === "en" || saved === "zh" ? saved : "zh";
  }

  function applyLang(lang) {
    var dict = I18N[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = dict.docTitle;

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict.docDesc);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    // 按钮显示“将要切换到的语言”
    var toggle = document.getElementById("langToggle");
    if (toggle) toggle.textContent = lang === "zh" ? "EN" : "中文";

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* 忽略 */ }
  }

  function initLang() {
    applyLang(currentLang());
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyLang(currentLang() === "zh" ? "en" : "zh");
      });
    }
  }

  /* ---------- 顶栏滚动状态 ---------- */
  function initHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 移动端菜单 ---------- */
  function initBurger() {
    var burger = document.getElementById("navBurger");
    var header = document.getElementById("siteHeader");
    if (!burger || !header) return;
    burger.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击导航链接后收起菜单
    header.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 滚动入场动效 ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 导航滚动高亮 ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll('.main-nav a[href^="#"]');
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (target) map[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    Object.keys(map).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  /* ---------- 照片 X光 + 粒子特效 ----------
     作用：Hero 区照片（常服 + 学士服）的交互。
     - 常服是底图；鼠标进入照片后，学士服以圆形 clip-path 从鼠标位置“透视”出来
     - 鼠标移动时从鼠标处向外喷出橙色粒子（canvas 绘制，逐渐消散）
     - 触屏：长按 200ms 触发同样效果（模拟悬停）
     常用调整：
     - 透视圆半径：改 updateMask 里的 120px
     - 粒子数量/速度/颜色：改 spawnParticles、Particle 构造（speed/size）与 drawParticles 的 fillStyle
     - 悬停判定与触发：mouseenter / mousemove / mouseleave 三个监听
  */
  function initPhotoXray() {
    var container = document.querySelector(".photo-container");
    if (!container) return;

    var baseImg = container.querySelector(".photo-base");
    var xrayImg = container.querySelector(".photo-xray");
    var canvas = container.querySelector(".particle-canvas");
    var ring = container.querySelector(".photo-xray-ring");
    var ctx = canvas.getContext("2d");
    var particles = [];
    var mouseX = 0;
    var mouseY = 0;
    var rafId = null;
    var isHovering = false;

    function resizeCanvas() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* 粒子类 */
    function Particle(x, y) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 0.3 + Math.random() * 1.2;
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.decay = 0.008 + Math.random() * 0.015;
      this.size = 1 + Math.random() * 2.5;
    }

    function spawnParticles(x, y) {
      for (var i = 0; i < 3; i++) {
        particles.push(new Particle(x, y));
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = "#ff8000";
        ctx.shadowColor = "rgba(255, 128, 0, 0.6)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (isHovering || particles.length > 0) {
        rafId = requestAnimationFrame(drawParticles);
      }
    }

    /* 更新 X光遮罩：用 clip-path 圆形显示学士服 */
    function updateMask(x, y) {
      var w = container.offsetWidth;
      var h = container.offsetHeight;
      var px = (x / w) * 100;
      var py = (y / h) * 100;
      xrayImg.style.clipPath = "circle(120px at " + px + "% " + py + "%)";
      xrayImg.style.webkitClipPath = "circle(120px at " + px + "% " + py + "%)";
      ring.style.left = x + "px";
      ring.style.top = y + "px";
    }

    container.addEventListener("mouseenter", function (e) {
      isHovering = true;
      container.classList.add("is-hovering");
      var rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      updateMask(mouseX, mouseY);
      if (!rafId) drawParticles();
    });

    container.addEventListener("mousemove", function (e) {
      var rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      updateMask(mouseX, mouseY);
      spawnParticles(mouseX, mouseY);
    });

    container.addEventListener("mouseleave", function () {
      isHovering = false;
      container.classList.remove("is-hovering");
      /* 逐渐收小遮罩 */
      xrayImg.style.clipPath = "circle(0px at 50% 50%)";
      xrayImg.style.webkitClipPath = "circle(0px at 50% 50%)";
    });

    /* 触屏支持：长按显示学士服 */
    var touchTimer = null;
    container.addEventListener("touchstart", function (e) {
      var touch = e.touches[0];
      var rect = container.getBoundingClientRect();
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
      touchTimer = setTimeout(function () {
        isHovering = true;
        container.classList.add("is-hovering");
        updateMask(mouseX, mouseY);
        if (!rafId) drawParticles();
      }, 200);
    }, { passive: true });

    container.addEventListener("touchmove", function (e) {
      if (!isHovering) return;
      var touch = e.touches[0];
      var rect = container.getBoundingClientRect();
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
      updateMask(mouseX, mouseY);
      spawnParticles(mouseX, mouseY);
    }, { passive: true });

    container.addEventListener("touchend", function () {
      clearTimeout(touchTimer);
      isHovering = false;
      container.classList.remove("is-hovering");
      xrayImg.style.clipPath = "circle(0px at 50% 50%)";
      xrayImg.style.webkitClipPath = "circle(0px at 50% 50%)";
    });
  }

  /* ---------- 背景尘埃粒子（缓慢漂浮、轻微闪烁） ----------
     作用：整页背景的微光尘埃（canvas 全屏覆盖，跟随滚动？不，它是 fixed 固定在视口）。
     常用调整：
     - 粒子密度：改 resize() 里 count 的计算（/40000 是每多少平方像素一粒）
     - 粒子颜色：warm=true 走暖橙 #ff9a45，否则冷白 #e8ecf2，改 drawParticles 里的 fillStyle
     - 上浮速度：改 makeParticle 的 speed（0.08–0.28）
     - 想整体关掉背景粒子：删除 index.html 里的 <canvas class="bg-canvas">
  */
  function initBgParticles() {
    var canvas = document.querySelector(".bg-canvas");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.remove();
      return;
    }
    var ctx = canvas.getContext("2d");
    var particles = [];
    var rafId = null;
    var width = 0;
    var height = 0;

    function makeParticle(initial) {
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 4,
        size: 0.5 + Math.random() * 1.7,
        speed: 0.08 + Math.random() * 0.28,
        sway: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.65
      };
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 密度：每约 4 万平方像素 1 粒，上限 55 粒，保持淡雅
      var count = Math.max(24, Math.min(55, Math.round((width * height) / 40000)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(true));
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.speed;
        p.x += Math.sin(t * 0.0004 + p.phase) * 0.12;
        if (p.y < -6) {
          particles[i] = makeParticle(false);
          continue;
        }
        // 呼吸式闪烁
        var twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 + p.phase);
        ctx.globalAlpha = (0.08 + 0.2 * twinkle) * (p.size / 2.2 + 0.4);
        ctx.fillStyle = p.warm ? "#ff9a45" : "#e8ecf2";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.dataset.active = "1";
    rafId = requestAnimationFrame(draw);
  }

  /* ---------- 工卡交互：聚光灯跟随 + 轻微 3D 倾斜 ----------
     作用：Hero 区的 .id-card（工卡）在鼠标移动时：
     - 聚光灯层（.id-spotlight）的高光中心跟随鼠标（--sx / --sy 变量）
     - 卡片整体做轻微 3D 倾斜（rotateX / rotateY，最大约 ±5°）
     与 X 光互不干扰：X 光监听 .photo-container，这里监听整个 .id-card。
     常用调整：
     - 倾斜幅度：改下面的 MAX_TILT（当前 5 度）
     - 聚光灯强度/颜色：改 css/style.css 里 .id-spotlight 的 radial-gradient
  */
  function initIdCard() {
    var card = document.getElementById("idCard");
    if (!card) return;
    var spotlight = card.querySelector(".id-spotlight");
    var MAX_TILT = 5;   // 最大倾斜角度（度）
    var rafId = null;
    var targetRx = 0, targetRy = 0, curRx = 0, curRy = 0;

    // 每帧向目标角度插值（平滑倾斜）
    function animateTilt() {
      curRx += (targetRx - curRx) * 0.15;
      curRy += (targetRy - curRy) * 0.15;
      card.style.transform = "rotateX(" + curRx + "deg) rotateY(" + curRy + "deg)";
      if (Math.abs(targetRx - curRx) > 0.01 || Math.abs(targetRy - curRy) > 0.01) {
        rafId = requestAnimationFrame(animateTilt);
      } else {
        rafId = null;
      }
    }

    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;   // 0..1 水平位置
      var py = (e.clientY - rect.top) / rect.height;   // 0..1 垂直位置

      // 聚光灯跟随（用 CSS 变量，.id-spotlight 的 radial-gradient 引用）
      if (spotlight) {
        spotlight.style.setProperty("--sx", (px * 100).toFixed(1) + "%");
        spotlight.style.setProperty("--sy", (py * 100).toFixed(1) + "%");
      }

      // 倾斜：向鼠标方向倾斜，幅度随位置
      targetRy = (px - 0.5) * 2 * MAX_TILT;
      targetRx = (0.5 - py) * 2 * MAX_TILT;
      card.classList.add("is-tilting");
      if (!rafId) animateTilt();
    });

    card.addEventListener("mouseenter", function () {
      card.classList.add("is-hovering-card");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-tilting", "is-hovering-card");
      targetRx = 0;
      targetRy = 0;
      if (!rafId) animateTilt();
    });
  }

  /* ---------- 自定义光标：点跟随 + 环延迟 + 拖尾粒子 ----------
     作用：桌面端（有鼠标的设备）用橙色小点 + 延迟圆环替代系统光标，
           鼠标移动时喷出淡橙色粒子拖尾。
     - 仅在 (hover:hover) 且 (pointer:fine) 的设备启用（CSS 里同步控制显示）
     - 可交互元素（a/button/卡片/照片）悬停时圆环放大（is-active）
     常用调整：
     - 拖尾粒子颜色/大小/速度：改 spawnTrail / Particle 的 fillStyle / speed / size
     - 圆环延迟跟随时的手感：改下面 ring 插值系数 0.16（越大越跟手）
     - 想完全关闭：删掉 index.html 的 .cursor-dot/.cursor-ring/.cursor-trail 三个元素
  */
  function initCustomCursor() {
    // 仅在支持悬停的桌面设备启用
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    var trailCanvas = document.querySelector(".cursor-trail");
    if (!dot || !ring || !trailCanvas) return;

    var ctx = trailCanvas.getContext("2d");
    var ringX = -100, ringY = -100;   // 圆环当前坐标（延迟跟随）
    var mouseX = -100, mouseY = -100; // 鼠标目标坐标
    var trail = [];
    var rafId = null;
    var lastMove = 0;
    var w = 0, h = 0;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      trailCanvas.width = w * dpr;
      trailCanvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // 拖尾粒子
    function spawnTrail(x, y) {
      var now = Date.now();
      if (now - lastMove < 14) return;   // 限频，避免拖尾过密
      lastMove = now;
      for (var i = 0; i < 2; i++) {
        trail.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          life: 1,
          decay: 0.03 + Math.random() * 0.03,
          size: 1.2 + Math.random() * 2
        });
      }
    }

    function draw() {
      // 圆环平滑插值跟随（0.16 = 延迟感，越小越“飘”）
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0)";
      dot.style.transform = "translate3d(" + mouseX + "px, " + mouseY + "px, 0)";

      // 拖尾粒子
      ctx.clearRect(0, 0, w, h);
      for (var i = trail.length - 1; i >= 0; i--) {
        var p = trail[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.globalAlpha = p.life * 0.45;
        ctx.fillStyle = "#ffb066";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spawnTrail(mouseX, mouseY);
      if (!rafId) draw();

      // 用 elementFromPoint 判断鼠标下是否是可交互元素（比 mouseover 更可靠）
      var el = document.elementFromPoint(mouseX, mouseY);
      var interactive = el && el.closest &&
        el.closest("a, button, .course-card, .skill-card, .photo-container, .id-card");
      ring.classList.toggle("is-active", !!interactive);
    }, { passive: true });

    // 鼠标离开窗口时隐藏光标
    document.documentElement.addEventListener("mouseleave", function () {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.documentElement.addEventListener("mouseenter", function () {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initHeader();
    initBurger();
    initReveal();
    initScrollSpy();
    initBgParticles();
    initIdCard();
    initPhotoXray();
    initCustomCursor();
  });
})();
