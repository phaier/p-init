package copy

import (
	"embed"
	"io"
	"io/fs"
	"os"
	"path/filepath"
)

func copyFile(cd string, files fs.FS, path string) error {
	file, err := files.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return err
	}

	relativePath, err := filepath.Rel(".", path)
	if err != nil {
		return err
	}

	destPath := filepath.Join(cd, relativePath)

	destDir := filepath.Dir(destPath)
	if err := os.MkdirAll(destDir, os.ModePerm); err != nil {
		return err
	}

	if err := os.WriteFile(destPath, data, os.ModePerm); err != nil {
		return err
	}

	return nil
}

func copyWithFS(files fs.FS) error {
	cd, err := os.Getwd()
	if err != nil {
		return err
	}

	err = fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() {
			err := copyFile(cd, files, path)
			if err != nil {
				return err
			}

			return nil
		}

		return nil
	})

	return err
}

//go:embed npm/*
var npmFS embed.FS

//go:embed github-pages/*
var githubPagesFS embed.FS

// Copy は指定されたテンプレートをコピーします
func Copy(template string) error {
	switch template {
	case "npm":
		files, err := fs.Sub(npmFS, "npm")
		if err != nil {
			return err
		}

		return copyWithFS(files)
	case "github-pages":
		files, err := fs.Sub(githubPagesFS, "github-pages")
		if err != nil {
			return err
		}

		return copyWithFS(files)
	}

	return nil
}
