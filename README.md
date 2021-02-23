# hjson-formatter

用于对.hjson文件的格式化

什么是[Hjson](https://hjson.github.io/)？

安装扩展后即可在hjson文件中使用格式化命令进行格式化。

> 推荐安装扩展[Hjson](https://marketplace.visualstudio.com/items?itemName=laktak.hjson)以获得更好的语言支持

## Default Formatter

为了确保这个扩展比其他你可能已经安装的扩展优先使用，请在你的VS Code设置中将它设置为对应语言的默认格式化程序。

```json
{
  "[hjson]": {
    "editor.defaultFormatter": "Tanh.hjson-formatter"
  }
}
```

此扩展依赖[hjson](https://www.npmjs.com/package/hjson),感谢！