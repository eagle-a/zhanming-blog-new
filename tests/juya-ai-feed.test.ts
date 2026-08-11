import test from 'node:test'
import assert from 'node:assert/strict'
import { createJuyaAIFeedView, parseJuyaAIFeed } from '../src/lib/juya-ai-feed.ts'

const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
  <channel>
    <title>橘鸦AI早报</title>
    <description>AI 早报 RSS</description>
    <lastBuildDate>Fri, 07 Aug 2026 01:38:48 GMT</lastBuildDate>
    <item>
      <title>2026-08-07</title>
      <link>https://daily.juya.uk/issues/2026-08-07/</link>
      <pubDate>Fri, 07 Aug 2026 01:38:48 GMT</pubDate>
      <description>今日 AI 要闻</description>
      <content:encoded><![CDATA[
        <h1>AI 早报 2026-08-07</h1>
        <p><img src="https://assets.juya.uk/cover.png" onerror="alert(1)"></p>
        <p><a href="https://example.com/news">安全链接</a></p>
        <script>alert(2)</script>
      ]]></content:encoded>
    </item>
    <item>
      <title>不安全条目</title>
      <link>javascript:alert(1)</link>
      <pubDate>Fri, 07 Aug 2026 01:38:48 GMT</pubDate>
      <description>不应进入结果</description>
    </item>
  </channel>
</rss>`

test('parses the Juya RSS format and sanitizes rich issue content', () => {
	const result = parseJuyaAIFeed(feed)
	assert.equal(result.issues.length, 1)
	assert.equal(result.issues[0].title, '2026-08-07')
	assert.equal(result.issues[0].summary, '今日 AI 要闻')
	assert.match(result.issues[0].contentHtml, /assets\.juya\.uk\/cover\.png/)
	assert.doesNotMatch(result.issues[0].contentHtml, /<h1|script|onerror/i)
	assert.equal(result.homeUrl, 'https://daily.juya.uk/')
	assert.equal(result.rssUrl, 'https://daily.juya.uk/rss.xml')
})

test('rejects RSS documents without valid Juya issue links', () => {
	assert.throws(
		() => parseJuyaAIFeed('<rss><channel><item><title>2026-08-07</title><link>https://evil.test/issues/2026-08-07/</link></item></channel></rss>'),
		/no valid issues/
	)
})

test('serializes issue summaries with only the selected full body', () => {
	const parsed = parseJuyaAIFeed(feed)
	const view = createJuyaAIFeedView(parsed)

	assert.ok(view)
	assert.equal(view.selectedIssue.id, parsed.issues[0].id)
	assert.match(view.selectedIssue.contentHtml, /assets\.juya\.uk\/cover\.png/)
	assert.equal('contentHtml' in view.issues[0], false)
	assert.equal(createJuyaAIFeedView(parsed, 'https://daily.juya.uk/issues/1999-01-01/'), null)
})
