import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { createPost } from "../../api/post";
import { getAllCategories } from "../../api/category";
import Message from "../../components/Message";
import "./EditorPage.css";

const EditorPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(
    "## 开始写作吧！\n\n这里支持完整的 Markdown 语法。"
  );
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取分类列表
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.code === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("获取分类失败:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleTagInput = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 生成文章摘要
  const generateSummary = (content) => {
    // 移除 Markdown 标记
    const plainText = content.replace(/[#*`[\]()]/g, "");
    // 取前 200 个字符
    return plainText.slice(0, 200).trim();
  };

  const handlePublish = useCallback(async () => {
    if (!title.trim()) {
      Message.error("请输入文章标题");
      return;
    }
    if (!content.trim()) {
      Message.error("请输入文章内容");
      return;
    }
    if (!categoryId) {
      Message.error("请选择文章分类");
      return;
    }

    const postData = {
      title: title.trim(),
      contentMd: content,
      summary: generateSummary(content),
      categoryId: parseInt(categoryId),
      tags: tags,
    };

    setIsSubmitting(true);
    try {
      const response = await createPost(postData);
      if (response.code === 200) {
        Message.success("发布成功！");
        navigate("/");
      } else {
        Message.error(response.msg || "发布失败，请重试");
      }
    } catch (error) {
      console.error("发布文章失败:", error);
      Message.error("发布失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  }, [title, content, categoryId, tags, navigate]);

  return (
    <div className="editor-fullscreen">
      <div className="editor-container">
        <div className="editor-header">
          <div className="editor-header-left">
            <button className="back-button" onClick={() => navigate("/")}>
              <span role="img" aria-label="back">
                ←
              </span>
              返回
            </button>
            <input
              type="text"
              className="editor-title"
              placeholder="输入文章标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="editor-actions">
            <button
              className="preview-toggle"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? "编辑模式" : "预览模式"}
            </button>
            <button
              className="publish-button"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              {isSubmitting ? "发布中..." : "发布文章"}
            </button>
          </div>
        </div>

        <div className="editor-main">
          <div className="editor-content">
            <MDEditor
              value={content}
              onChange={setContent}
              preview={isPreview ? "preview" : "live"}
              height={800}
              highlightEnable={true}
              hideToolbar={false}
              enableScroll={true}
              textareaProps={{
                placeholder: "开始创作你的文章...",
              }}
            />
          </div>

          <div className="editor-sidebar">
            <div className="sidebar-section">
              <h3>
                <span role="img" aria-label="settings">
                  ⚙️
                </span>
                文章设置
              </h3>
              <div className="setting-item">
                <label>文章分类</label>
                <select
                  className="category-select"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">选择分类...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="setting-item">
                <label>文章标签</label>
                <div className="tags-container">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                      <button onClick={() => removeTag(tag)}>&times;</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="tag-input"
                  placeholder="输入标签按回车添加..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
