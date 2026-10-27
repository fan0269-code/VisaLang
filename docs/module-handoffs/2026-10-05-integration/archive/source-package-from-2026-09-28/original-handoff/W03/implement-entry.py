from pathlib import Path
# Keep the current image and main route action; put stage links beside them.
p=Path('src/components/HomeHero.astro');s=p.read_text();start=s.index('  featuredRoute: {');end=s.index('\n}',start);s=s[:start]+s[end:];s=s.replace(', featuredRoute','').replace("const routeTitleId = `featured-route-${locale}`;\n",'');s=s[:s.index('\n<section class="home-route-spotlight"')];s=s.replace('    </div>\n  </div>\n  <div class="home-hero__visual">','    </div>\n    <slot />\n  </div>\n  <div class="home-hero__visual">');p.write_text(s)
for locale in ['en','zh']:
 p=Path('src/pages/index.astro' if locale=='en' else 'src/pages/zh/index.astro');s=p.read_text();s=s.replace("import RouteSelector from '../components/RouteSelector.astro';\n",'').replace("import RouteSelector from '../../components/RouteSelector.astro';\n",'');s=s.replace('isGuidePrimaryDiscoveryEligible, ','')
 start=s.index('      featuredRoute={{');end=s.index('    <section class="section"',start)
 # Replace old spotlight props and old stage section, retaining later updated/trust content.
 stage_end=s.index('\n    <hr class="rule" />',end)
 if locale=='en':
  s=s.replace("      secondary={{ href: '/germany-b1-settlement-citizenship/', label: 'Read Germany B1 guides' }}\n",'')
  start=s.index('      featuredRoute={{');end=s.index('    <section class="section"',start);stage_end=s.index('\n    <hr class="rule" />',end)
  s=s[:start]+'''    >
      <section class="home-tasks" aria-labelledby="stage-title">
        <h2 id="stage-title">Or go straight to your task</h2>
        <ol class="stage-list">
          <li class="stage-card"><div><h3><a href="/guides/german-family-reunion-language-requirement/">Check the requirement</a></h3><p>Find the instruction for your application location and category.</p></div></li>
          <li class="stage-card"><div><h3><a href="/guides/goethe-a1-germany-family-reunion/">Already have a certificate?</a></h3><p>Record the exact certificate and date; check acceptance with the receiving authority.</p></div></li>
          <li class="stage-card"><div><h3><a href="/guides/german-a1-exam-booking-timeline/">Prepare booking and next steps</a></h3><p>Record the selected centre, fee, dates and documents to verify before booking.</p></div></li>
        </ol>
      </section>
    </HomeHero>
''' +s[stage_end:]
  start=s.index('    <section class="section" aria-labelledby="resources-title">');end=s.index('    <section class="section" aria-labelledby="updated-title">',start)
  s=s[:start]+'''    <section class="section" aria-labelledby="resources-title">
      <h2 class="section-title" id="resources-title">What you can use here</h2>
      <div class="resource-layout">
        <div class="resource-lead">
          <h3>Germany A1: a complete preparation workflow</h3>
          <p>Our main planning route covers Germany A1 family reunion. Separate guides explain B1 language evidence for settlement permits and citizenship.</p>
          <p>Route Finder organises your starting questions. Its fully configured route currently covers Germany A1 family reunion. The other four registered routes offer official verification starting points, including B1.</p>
        </div>
        <div class="resource-list">
          <a class="resource-link" href="/germany-b1-settlement-citizenship/"><div><h3>B1: settlement and citizenship guides</h3><p>A content topic with authority checks; B1 tools remain verification-only.</p></div><span>Read guides</span></a>
          <a class="resource-link" href="/tools/route-finder/"><div><h3>Other purposes or not sure yet?</h3><p>Choose manually to find the authority and questions to verify. This does not decide eligibility or accepted proof.</p></div><span>Open Route Finder</span></a>
        </div>
      </div>
    </section>

''' +s[end:]
  s=s.replace('description="Start with your application route, understand the evidence you may need, and organise your next steps before booking an exam."','description="Germany A1 family reunion: check requirements, existing proof and booking steps. The receiving authority decides what it accepts."')
 else:
  s=s.replace("      secondary={{ href: '/germany-b1-settlement-citizenship/', label: '查看 B1 指南（英文）' }}\n",'')
  s=s.replace("primary={{ href: '/zh/guides/german-family-reunion-language-requirement/', label: '查看中文 A1 要求' }}", "primary={{ href: '/zh/germany-family-reunion-a1/', label: '查看完整 A1 准备流程' }}")
  start=s.index('      featuredRoute={{');end=s.index('    <section class="section"',start);stage_end=s.index('\n    <hr class="rule" />',end)
  s=s[:start]+'''    >
      <section class="home-tasks" aria-labelledby="zh-stage-title">
        <h2 id="zh-stage-title">也可以直接进入当前任务</h2>
        <ol class="stage-list">
          <li class="stage-card"><div><h3><a href="/zh/guides/german-family-reunion-language-requirement/">查要求</a></h3><p>按实际申请地与类别，找到负责机关的说明。</p></div></li>
          <li class="stage-card"><div><h3><a href="/zh/guides/goethe-a1-germany-family-reunion/">已有 Goethe A1 证书？</a></h3><p>记录证书名称与考试日期，向接收材料的机关核对接收条件。</p></div></li>
          <li class="stage-card"><div><h3><a href="/zh/guides/german-a1-exam-booking-timeline/">准备报名</a></h3><p>整理所选考点、费用、日期与材料，报名前逐项核验。</p></div></li>
        </ol>
      </section>
    </HomeHero>
''' +s[stage_end:]
  start=s.index('    <section class="section" aria-labelledby="zh-resources-title">');end=s.index('    <section class="section" id="zh-guides"',start)
  s=s[:start]+'''    <section class="section" aria-labelledby="zh-resources-title">
      <h2 class="section-title" id="zh-resources-title">本站能帮你做什么</h2>
      <div class="resource-layout">
        <div class="resource-lead">
          <h3>德国 A1：完整准备流程</h3>
          <p>目前完整配置的是德国 A1 配偶团聚规划。路线、核对清单、时间线、考试比较和提醒均提供中文界面。</p>
          <p>另外四条已登记工具路线仅提供官方核验起点，其中包括 B1；是否接收证明、个案要求与最终结果，仍由负责机构决定。</p>
        </div>
        <div class="resource-list">
          <a class="resource-link" href="/germany-b1-settlement-citizenship/"><div><h3>B1：永居与入籍指南（英文）</h3><p>这是内容专题；B1 工具仍仅提供核验起点，不是完整准备流程。</p></div><span>阅读英文指南</span></a>
          <a class="resource-link" href="/zh/tools/route-finder/"><div><h3>其他目的，或还不确定？</h3><p>手动选择目的，找到负责机构与待核问题；不据此判断资格或证明是否被接收。</p></div><span>使用路线查找器</span></a>
        </div>
      </div>
    </section>

''' +s[end:]
  s=s.replace('description="先确认申请要求，再选择考试，最后安排报名和材料。VisaLang 目前重点提供德国 A1 配偶团聚规划，并提供德国永居、入籍 B1 语言证明的英文指南。"','description="德国 A1 配偶团聚规划：查要求、核对已有证书、准备报名。证明是否被接收，以负责你申请的机关为准。"')
 p.write_text(s)
