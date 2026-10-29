#!/usr/bin/env python3
"""Dependency-free local link and basic semantic accessibility checks."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import re
root=Path(__file__).resolve().parents[1]/'docs'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.links=[];self.labels=[];self.inputs=[];self.h1=0;self.lang=False;self.images=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a' and 'href' in a:self.links.append(a['href'])
  if tag in ('script','link'):
   value=a.get('src') or a.get('href')
   if value:self.links.append(value)
  if tag=='label':self.labels.append(a.get('for'))
  if tag in ('input','select'):self.inputs.append(a.get('id'))
  if tag=='h1':self.h1+=1
  if tag=='html':self.lang=a.get('lang')=='en'
  if tag=='img':self.images.append(a)
pages={p:Page(p.read_text()) for p in root.rglob('*.html')}
main=pages[root/'index.html']
assert main.h1==1 and main.lang,'One h1 and declared English language are required'
assert len(main.ids)==len(set(main.ids)),'Duplicate IDs'
assert all(i in main.labels for i in main.inputs),'Every input and select needs a label'
assert all('alt' in i for i in main.images),'Image lacks alt text'
checks=0
for href in main.links:
 u=urlsplit(href)
 if u.scheme or u.netloc:continue
 assert not u.path.startswith('/'),'Asset path must support repository subpath'
 file=(root/unquote(u.path)).resolve() if u.path else root/'index.html'
 assert file.is_relative_to(root.resolve()),f'Escaping docs root: {href}'
 assert file.exists(),f'Broken local link: {href}'
 if u.fragment and file.suffix=='.html':assert unquote(u.fragment) in pages[file].ids,f'Broken fragment: {href}'
 checks+=1
css=(root/'assets/style.css').read_text()
for pattern in ['max-width:540px','max-width:800px','focus-visible','prefers-reduced-motion']:
 assert pattern in css,f'Missing responsive/accessibility rule: {pattern}'
print(f'PASS: {checks} local links/fragments; unique IDs; input labels; language; one h1; responsive/focus/reduced-motion rules')
print('Scope: static checks do not replace browser, screen-reader or contrast audits.')
