package copy

import (
	"embed"
	"io/fs"
	"os"
	"path/filepath"
)

func copyWithFS(files embed.FS) error {
	cd, err := os.Getwd()
	if err != nil {
		return err
	}

	err = fs.WalkDir(files, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() {
			data, err := files.ReadFile(path)
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

		return nil
	})

	return err
}

//go:embed npm/*
var npmFS embed.FS

// Copy は指定されたテンプレートをコピーします
func Copy(template string) error {
	switch template {
	case "npm":
		return copyWithFS(npmFS)
	}

	return nil
}
