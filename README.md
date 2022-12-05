# glob-iconv-lite

## Description

iconv-liteをcli化。globで複数ファイルを指定してエンコーディングできるようにしたもの。  
引数を渡すことでiconv-liteを実行することができる。  

## Requirement

* Node.js -> check cmd `node -v`

## Install

```sh
npm i -D https://github.com/ysknk/glob-iconv-lite.git
```

## Usage

### add script in package.json

```json
{
  "scripts": {
    "iconv-lite": "iconv-lite"
  },
}
```

```sh
# check arguments help
npm run iconv-lite -- --help
```

### ex) set options

project root `.iconvliterc.js`  
or  
cli `npm run iconvlite -- -cwd \"./test/before\" -src \"**/[!_]*.txt\" -dest \"./test/after/\" -to \"sjis\"
`
