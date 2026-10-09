const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '展开导航'); }
menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') !== 'true'; navigation.classList.toggle('open', expanded); menu.setAttribute('aria-expanded', String(expanded)); menu.setAttribute('aria-label', expanded ? '收起导航' : '展开导航'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
const views = {
  connect: { title: '每一次连接，都清晰可见。', labels: ['示例接入设备', '示例在线率'], values: ['128', '98.4'], units: ['台', '%'], chart: '设备活跃趋势', description: '统一接入视图，掌握设备连接与在线状态。', points: 'M0 120L35 105L70 110L110 75L150 85L185 55L220 65L260 40L300 58L340 25L380 35L420 15L460 32L500 10' },
  insight: { title: '让数据，成为决策的线索。', labels: ['示例数据采集量', '示例监测指标'], values: ['24.6', '36'], units: ['万条', '项'], chart: '数据采集趋势', description: '汇聚设备数据，用趋势视图发现业务变化。', points: 'M0 110L35 115L70 90L110 105L150 70L185 80L220 50L260 65L300 30L340 45L380 15L420 40L460 20L500 30' },
  action: { title: '从实时感知，到场景行动。', labels: ['示例联动规则', '示例今日触发'], values: ['12', '86'], units: ['条', '次'], chart: '场景触发趋势', description: '通过规则编排，将设备状态转化为场景响应。', points: 'M0 125L35 125L70 85L110 85L150 110L185 110L220 45L260 45L300 95L340 95L380 35L420 35L460 60L500 60' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  const view = views[tab.dataset.view];
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector('#platform-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#view-title').textContent = view.title;
  ['one', 'two'].forEach((suffix, index) => { document.querySelector('#metric-label-' + suffix).textContent = view.labels[index]; const metric = document.querySelector('#metric-' + suffix); metric.textContent = view.values[index]; const unit = document.createElement('span'); unit.textContent = view.units[index]; metric.append(unit); });
  document.querySelector('#chart-title').textContent = view.chart;
  document.querySelector('.chart svg').setAttribute('aria-label', '示例' + view.chart + '图');
  document.querySelector('#chart-line').setAttribute('d', view.points);
  document.querySelector('#chart-area').setAttribute('d', view.points + 'V150H0Z');
  document.querySelector('#view-description').textContent = view.description;
}
tabs.forEach((tab, index) => { tab.addEventListener('click', () => selectTab(tab)); tab.addEventListener('keydown', event => { let target; if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length]; if (event.key === 'ArrowLeft') target = tabs[(index + tabs.length - 1) % tabs.length]; if (event.key === 'Home') target = tabs[0]; if (event.key === 'End') target = tabs[tabs.length - 1]; if (target) { event.preventDefault(); selectTab(target); target.focus(); } }); });
document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); const name = document.querySelector('#contact-name'); const message = document.querySelector('#contact-message'); if (!name.value.trim() || !message.value.trim()) { const field = !name.value.trim() ? name : message; field.setCustomValidity('请输入有效内容'); field.reportValidity(); return; } document.querySelector('#inquiry-output').value = `识加科技 · 智能养殖项目咨询\n联系人 / 公司：${name.value.trim()}\n项目需求：${message.value.trim()}`; document.querySelector('#form-result').hidden = false; document.querySelector('#copy-status').textContent = ''; });
['contact-name', 'contact-message'].forEach(id => document.getElementById(id).addEventListener('input', event => event.target.setCustomValidity('')));
document.querySelector('#copy-inquiry').addEventListener('click', async () => { const output = document.querySelector('#inquiry-output'); try { await navigator.clipboard.writeText(output.value); document.querySelector('#copy-status').textContent = '已复制'; } catch { output.focus(); output.select(); document.querySelector('#copy-status').textContent = '请手动复制已选中的内容'; } });
document.querySelector('#year').textContent = new Date().getFullYear();
