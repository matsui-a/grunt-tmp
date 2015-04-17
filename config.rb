#ディレクトリ名の設定
http_path = "develop/"
css_dir = "develop/css"
sass_dir = "develop/_scss"
images_dir = "develop/img"
javascripts_dir = "develop/js"

#コメント削除
line_comments = false

#URL指定を相対パスに変更
relative_assets = true

#圧縮
#output_style = expanded　
#output_style = compressed

# スプライト画像をユニークな名前じゃないやつで複製
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

#　スプライト画像のCSSパスをユニークな名前じゃないやつに書き換え
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end