export default {
  "*.ts*": [
    "prettier",
    "eslint",
    () => "tsc --skipLibCheck --noEmit --pretty", 
  ]
}